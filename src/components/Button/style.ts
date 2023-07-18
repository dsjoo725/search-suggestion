import styled from 'styled-components';
import { BUTTON_SIZE } from '../../constants/config';

const Button = styled.button<{
  size: 'md' | 'sm' | 'lg';
  color: 'blue' | 'gray';
}>`
  border-radius: 100%;
  width: ${(props) => BUTTON_SIZE[props.size]};
  height: ${(props) => BUTTON_SIZE[props.size]};
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => `var(--${props.color}-color)`};
  color: var(--white-color);

  cursor: pointer;
`;

export { Button };
