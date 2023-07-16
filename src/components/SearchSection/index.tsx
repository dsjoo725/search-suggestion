import React from 'react';
import SearchBar from '../SearchBar';
import * as S from './style';

function SearchSection() {
  return (
    <S.Wrapper>
      <S.Header>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </S.Header>
      <SearchBar />
    </S.Wrapper>
  );
}

export default SearchSection;
