import { useState } from 'react';
import * as S from './style';
import Button from '../Button';
import SearchSuggestion from '../SearchSuggestion';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import { Suggestion } from '../../constants/type';
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface Props {
  suggestions: Suggestion[];
  isLoading: boolean;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ suggestions, isLoading, inputText, setInputText }: Props) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const ref = useOnClickOutside(() => setIsFocus(false));

  const handleInputText = (event: React.FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  return (
    <S.Wrapper $isFocus={isFocus} ref={ref}>
      <S.InputLabel>
        {isFocus || inputText ? (
          <S.Input
            value={inputText}
            onInput={handleInputText}
            onFocus={() => setIsFocus(true)}
          />
        ) : (
          <S.Placeholder onClick={() => setIsFocus(true)}>
            <SearchIcon width="16px" height="16px" fill="var(--gray-color)" />
            질환명을 입력해 주세요.
          </S.Placeholder>
        )}
      </S.InputLabel>
      <Button Icon={SearchIcon} />
      {isFocus && (
        <SearchSuggestion
          isLoading={isLoading}
          suggestions={suggestions}
          inputText={inputText}
          setInputText={setInputText}
          setIsFocus={setIsFocus}
        />
      )}
    </S.Wrapper>
  );
}

export default SearchBar;
