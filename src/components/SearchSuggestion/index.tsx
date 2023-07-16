import React, { useEffect, useRef } from 'react';
import * as S from './style';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import Tag from '../Tag';
import useHandleFocus from '../../hooks/useHandleFocus';
import { Suggestion } from '../../constants/type';

interface Props {
  suggestions: Suggestion[];
  inputText: string;
}

function SearchSuggestion({ inputText, suggestions }: Props) {
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const { handleKeyDown } = useHandleFocus(focusableElementsRef);

  const recentSearches = ['간염', 'B형간염', 'A형간염'];
  const recommendSearches = ['간염', 'B형간염', 'A형간염'];

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const addFocusableElement = (el: HTMLElement) => {
    if (!focusableElementsRef.current.includes(el)) {
      focusableElementsRef.current.push(el);
    }
  };
  console.log(suggestions);

  return (
    <S.Wrapper>
      {inputText ? (
        <>
          <S.Content
            ref={(el: HTMLButtonElement) => el && addFocusableElement(el)}
          >
            <SearchIcon width="16px" height="16px" fill="var(--gray-color)" />
            {inputText}
          </S.Content>
          {suggestions.length > 0 && (
            <>
              <S.Title>추천 검색어</S.Title>
              {suggestions.map((suggestion, index) => (
                <S.Content
                  key={index}
                  ref={(el: HTMLButtonElement) => el && addFocusableElement(el)}
                >
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
          {recentSearches.map((recentSearch, index) => (
            <S.Content
              key={index}
              ref={(el: HTMLButtonElement) => el && addFocusableElement(el)}
            >
              <SearchIcon width="16px" height="16px" fill="var(--gray-color)" />
              {recentSearch}
            </S.Content>
          ))}

          <S.Dvider></S.Dvider>

          <S.Title>추천 검색어로 검색해보세요</S.Title>
          <S.TagList>
            {recommendSearches.map((recommendSearch, index) => (
              <Tag
                key={index}
                ref={(el: HTMLButtonElement) => el && addFocusableElement(el)}
                content={recommendSearch}
              />
            ))}
          </S.TagList>
        </>
      )}
    </S.Wrapper>
  );
}

export default SearchSuggestion;
