import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import * as S from './style';
import { search } from '../../apis/search';
import { Suggestion } from '../../constants/type';

function SearchSection() {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    search(inputText).then((res) => {
      console.log(res);
      setSuggestions(res);
    });
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
      />
    </S.Wrapper>
  );
}

export default SearchSection;
