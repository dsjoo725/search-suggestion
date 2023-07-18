# Search Suggestion

> 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

![pre (2)](https://github.com/eosun77/search-suggestion/assets/100937653/7e2da741-efe1-42ea-8c0c-af4446d60a26)

## 시작하기

### 클라이언트

```
$ git clone https://github.com/eosun77/search-suggestion.git
$ cd search-suggestion
$ npm install
$ npm start
```

### 서버

https://github.com/walking-sunset/assignment-api

## 기능 목록

### 1. API 호출별로 로컬 캐싱 구현

CacheRepository 클레스를 통해 cache API를 사용해 cache를 관리하는 기능을 분리했습니다.

- #EXPIRATION_TIME을 통해 만료시간을 설정할 수 있습니다.
- header에 만료시간과 현재시간을 저장해서 이후 cache data의 만료상태를 확인합니다.

```ts
// CacheRepository.ts
export class CacheRepository {
  #NAME = 'suggestions';
  #EXPIRATION_TIME = 60 * 1000;

  isExpired(response: Response) {
    const currentDate = new Date().getTime();

    const cachedDate = response.headers.get('Date');
    if (!cachedDate) return;
    const fetchDate = new Date(cachedDate).getTime();

    const cacheControl = response.headers.get('Cache-Control');
    const matches = cacheControl?.match(/max-age=(\d+)/);
    if (!matches) return;
    const maxAge = parseInt(matches[1], 10);

    return currentDate - fetchDate > maxAge;
  }

  async save(text: string, suggestions: Suggestion[]) {
    const cache = await caches.open(this.#NAME);
    const response = new Response(JSON.stringify(suggestions), {
      headers: {
        'Cache-Control': `max-age=${this.#EXPIRATION_TIME}`,
        Date: new Date().toISOString(),
      },
    });
    await cache.put(text, response);
  }

  async get(text: string) {
    const cache = await caches.open(this.#NAME);
    const response = await cache.match(text);

    if (response && this.isExpired(response)) {
      this.delete(text);
      return null;
    }

    return response ? await response.json() : null;
  }

  async delete(text: string) {
    const cache = await caches.open(this.#NAME);
    await cache.delete(text);
  }
}
```

SuggestionService 클레스를 통해 검색 API를 호출합니다.

- 검색 API를 호출하기 전에 CacheRepository의 get을 사용해서 해당 검색어에 해당하는 cache data를 확인합니다. 저장된 data가 있다면 그 data를 반환하고 없으면 API를 호출합니다.
- `console.info('calling api')`를 통해 API 호출 횟수를 확인 가능하도록 설정했습니다.
- API를 통해 전달 받은 data는 cache에 저장합니다

```ts
//SuggestionService.ts
export class SuggestionService {
  async get(textInput: string): Promise<Suggestion[]> {
    const text = textInput.trim();

    if (text === '') return [];

    const cacheRepository = new CacheRepository();
    const cacheResponse = await cacheRepository.get(text);
    if (cacheResponse) {
      return cacheResponse;
    }

    console.info('calling api');
    const response = await apiClient.get(`/sick?q=${text}`);
    const data = response.data.slice(0, 7);
    await cacheRepository.save(text, data);

    return data;
  }
}
```

### 2. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

빠른 연속 입력에 대한 API 호출을 방지하기 위해 특정 시간 동안 추가 호출을 지연시키는 Debouncing 기법을 사용했습니다.

- `value`가 변경되면 `delay` 시간동안 지연시킨 후에 `debouncedValue`를 반환합니다.
- `debouncedValue`를 사용하여 API를 호출하여 `value`가 변경 될 때마다 API 호출하지 않고 변경없이 `delay`시간이 지난 후에 호출합니다.
- 사용자 경험 향상을 위해 `delay` 시간동안 `loading` 상태를 true로 변경해주었습니다.

```ts
// useDebounce.ts
export default function useDebounce(
  value: string,
  delay: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay, setIsLoading]);

  return debouncedValue;
}
```

### 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

키보드 이벤트 함수를 `window.addEventListener`에 추가하는 기능을 분리했습니다.

```ts
// useKeyDown.ts
import { useCallback, useEffect } from 'react';

const useKeyDown = ({
  onArrowDown = () => {},
  onArrowUp = () => {},
  onEnter = () => {},
}: {
  onArrowDown?: () => void;
  onArrowUp?: () => void;
  onEnter?: () => void;
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onArrowDown();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        onArrowUp();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onEnter();
      }
    },
    [onArrowDown, onArrowUp, onEnter]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyDown;
```

추천 검색어들을 움직이기 위해 focus중인 index를 관리하는 기능을 분리해습니다.

- 키보드 위를 누르면 index를 1증가 시키고 키보드를 아래로 누르면 index를 1감소 시킵니다.
- 추천 검색어들을 `elementRefs`를 통해 전달 받아 해당 index를 focus합니다. elementRefs의 범위를 벗어난 index를 변경시킵니다.
- initDependency 변경되면 초기화 합니다.

```ts
// useKeyboardNavigation.ts
import { useState, useEffect } from 'react';
import useKeyDown from './useKeyDown';

export const useKeyboardNavigation = (
  elementRefs: React.MutableRefObject<HTMLElement[]>,
  initDependency: string,
  onEnter: () => void
) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useKeyDown({
    onArrowDown: () => setFocusedIndex((prevIndex) => prevIndex + 1),
    onArrowUp: () => setFocusedIndex((prevIndex) => prevIndex - 1),
    onEnter: onEnter,
  });

  useEffect(() => {
    if (elementRefs.current[focusedIndex]) {
      elementRefs.current[focusedIndex].focus();
    } else if (focusedIndex < 0)
      setFocusedIndex(elementRefs.current.length - 1);
    else if (focusedIndex > elementRefs.current.length - 1) setFocusedIndex(0);
  }, [elementRefs, focusedIndex]);

  useEffect(() => {
    elementRefs.current = [];
    setFocusedIndex(-1);
  }, [elementRefs, initDependency]);

  return focusedIndex;
};
```

추천 검색어를 보여주는 컴포넌트입니다.

- 추천 검색어를 suggestionRefs 배열에 저장합니다.
- 엔터를 누르면 해당 text를 inputText로 변경합니다.

```tsx
// SearchSuggestion/index.tsx
const suggestionRefs = useRef<HTMLElement[]>([]);

const selectSuggestion = () => {
  suggestionRefs.current[focusedIndex] &&
    setInputText(suggestionRefs.current[focusedIndex].innerText);
  setIsFocus(false);
};
const focusedIndex = useKeyboardNavigation(
  suggestionRefs,
  inputText,
  selectSuggestion
);

return (
  //...
  <>
    {suggestions.map((suggestion, index) => (
      <S.Content
        key={index}
        ref={(el) => el && (suggestionRefs.current[index + 1] = el)}
      >
        <SearchIcon width="16px" height="16px" fill="var(--gray-color)" />
        <S.Text>{suggestion.sickNm}</S.Text>
      </S.Content>
    ))}
  </>
  //...
);
```
