import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import * as S from './style';
import useDebounce from '../../hooks/useDebounce';
import useSuggestions from '../../hooks/useSuggestions';

function SearchSection() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedInputText = useDebounce(inputText, 300, setIsLoading);
  const suggestions = useSuggestions(debouncedInputText, setIsLoading);

  return (
    <S.Wrapper>
      <S.Header>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </S.Header>
      <SearchBar
        suggestions={suggestions}
        inputText={inputText}
        setInputText={setInputText}
        isLoading={isLoading}
      />
    </S.Wrapper>
  );
}

export default SearchSection;
