import React from 'react';
import * as S from './style';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import Tag from '../Tag';
import { Suggestion } from '../../constants/type';
import { RECOMMENDED_SEARCH } from '../../constants/config';

interface Props {
  suggestions: Suggestion[];
  inputText: string;
}

function SearchSuggestion({ inputText, suggestions }: Props) {
  return (
    <S.Wrapper>
      {inputText ? (
        <>
          <S.Content>
            <SearchIcon width="16px" height="16px" fill="var(--gray-color)" />
            {inputText}
          </S.Content>
          {suggestions.length > 0 && (
            <>
              <S.Title>추천 검색어</S.Title>
              {suggestions.map((suggestion, index) => (
                <S.Content key={index}>
                  <SearchIcon
                    width="16px"
                    height="16px"
                    fill="var(--gray-color)"
                  />
                  {suggestion.sickNm}
                </S.Content>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <S.Title>최근 검색어</S.Title>
          <S.SubContent> 최근검색어가 없습니다.</S.SubContent>
          <S.Dvider></S.Dvider>
          <S.Title>추천 검색어로 검색해보세요</S.Title>
          <S.TagList>
            {RECOMMENDED_SEARCH.map((recommendSearch, index) => (
              <Tag key={index} content={recommendSearch} />
            ))}
          </S.TagList>
        </>
      )}
    </S.Wrapper>
  );
}

export default SearchSuggestion;
