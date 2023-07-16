import React from 'react';
import * as S from './style';

interface Props {
  content: string;
}

function Tag({ content }: Props, ref: React.Ref<HTMLButtonElement>) {
  return <S.Button ref={ref}>{content}</S.Button>;
}

export default React.forwardRef(Tag);
