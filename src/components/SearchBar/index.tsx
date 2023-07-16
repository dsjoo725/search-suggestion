import React, { useState } from 'react';
import * as S from './style';
import Button from '../Button';

function SearchBar() {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <S.Wrapper isFocus={isFocus}>
      <S.InputLabel>
        {isFocus ? (
          <S.Input onBlur={() => setIsFocus(false)} />
        ) : (
          <S.Placeholder onClick={() => setIsFocus(true)}>
            🔍 질환명을 입력해 주세요.
          </S.Placeholder>
        )}
      </S.InputLabel>
      <Button />
    </S.Wrapper>
  );
}

export default SearchBar;
