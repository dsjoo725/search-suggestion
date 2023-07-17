import React from 'react';
import * as S from './style';
interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
function Button({ Icon }: Props) {
  return (
    <S.Button>
      <Icon width="21px" height="21px" />
    </S.Button>
  );
}

export default Button;
