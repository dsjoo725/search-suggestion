import React from 'react';
import * as S from './style';
import { ICON_SIZE } from '../../constants/config';

interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: 'md' | 'sm' | 'lg';
  color?: 'blue' | 'gray';
  onClick?: () => void;
}

function Button({ Icon, size = 'md', color = 'blue', onClick }: Props) {
  return (
    <S.Button size={size} color={color} onClick={onClick}>
      <Icon width={ICON_SIZE[size]} height={ICON_SIZE[size]} />
    </S.Button>
  );
}

export default Button;
