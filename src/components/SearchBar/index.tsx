import { useState } from 'react';
import * as S from './style';
import Button from '../Button';
import SearchSuggestion from '../SearchSuggestion';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import { Suggestion } from '../../constants/type';
interface Props {
  suggestions: Suggestion[];
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}
function SearchBar({ suggestions, inputText, setInputText }: Props) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleInputText = (event: React.FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  return (
    <S.Wrapper $isFocus={isFocus}>
      <S.InputLabel>
        {isFocus ? (
          <S.Input value={inputText} onInput={handleInputText} />
        ) : (
          <S.Placeholder onClick={() => setIsFocus(true)}>
            🔍 질환명을 입력해 주세요.
          </S.Placeholder>
        )}
      </S.InputLabel>
      <Button Icon={SearchIcon} />
      {isFocus && (
        <SearchSuggestion suggestions={suggestions} inputText={inputText} />
      )}
    </S.Wrapper>
  );
}

export default SearchBar;
