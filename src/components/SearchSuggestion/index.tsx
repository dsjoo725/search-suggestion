import { useRef } from 'react';
import * as S from './style';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import Tag from '../Tag';
import { Suggestion } from '../../constants/type';
import { RECOMMENDED_SEARCH } from '../../constants/config';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface Props {
  suggestions: Suggestion[];
  inputText: string;
  isLoading: boolean;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchSuggestion({
  inputText,
  suggestions,
  isLoading,
  setInputText,
  setIsFocus,
}: Props) {
  const suggestionRefs = useRef<HTMLElement[]>([]);

  const selectSuggestion = () => {
    setInputText(suggestionRefs.current[focusedIndex].innerText);
    setIsFocus(false);
  };
  const focusedIndex = useKeyboardNavigation(
    suggestionRefs,
    inputText,
    selectSuggestion
  );

  return (
    <S.Wrapper>
      {inputText ? (
        isLoading ? (
          <S.Title>검색중...</S.Title>
        ) : (
          <>
            <S.Content ref={(el) => el && (suggestionRefs.current[0] = el)}>
              <SearchIcon width="16px" height="16px" fill="var(--gray-color)" />
              <S.Text>{inputText}</S.Text>
            </S.Content>
            <S.Title>추천 검색어</S.Title>
            {suggestions.length > 0 ? (
              <>
                {suggestions.map((suggestion, index) => (
                  <S.Content
                    onClick={() => console.log(suggestion.sickNm)}
                    key={index}
                    ref={(el) => el && (suggestionRefs.current[index + 1] = el)}
                  >
                    <SearchIcon
                      width="16px"
                      height="16px"
                      fill="var(--gray-color)"
                    />
                    <S.Text>{suggestion.sickNm}</S.Text>
                  </S.Content>
                ))}
              </>
            ) : (
              <S.SubContent>추천 검색어가 없습니다.</S.SubContent>
            )}
          </>
        )
      ) : (
        <>
          <S.Title>최근 검색어</S.Title>
          <S.SubContent> 최근검색어가 없습니다.</S.SubContent>
          <S.Dvider></S.Dvider>
          <S.Title>추천 검색어로 검색해보세요</S.Title>
          <S.TagList>
            {RECOMMENDED_SEARCH.map((recommendSearch, index) => (
              <Tag
                key={index}
                content={recommendSearch}
                ref={(el) => el && (suggestionRefs.current[index] = el)}
              />
            ))}
          </S.TagList>
        </>
      )}
    </S.Wrapper>
  );
}

export default SearchSuggestion;
