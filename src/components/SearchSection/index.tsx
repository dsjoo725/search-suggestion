import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import * as S from './style';
import { Suggestion } from '../../constants/type';
import { SuggestionService } from '../../service/SuggestionService';

function SearchSection() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const suggestionService = new SuggestionService();
    suggestionService
      .get(inputText)
      .then((res) => {
        setSuggestions(res);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => setIsLoading(false));
  }, [inputText]);

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
