import styled, { css } from 'styled-components';

interface Props {
  isFocus: boolean;
}
const Wrapper = styled.div<Props>`
  ${({ isFocus }) => css`
    background: var(--white-color);
    border-radius: 42px;
    max-width: 490px;
    width: 100%;
    padding-right: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 2px solid ${isFocus ? 'var(--blue-color)' : 'var(--white-color)'};
  `}
`;

const InputLabel = styled.label`
  width: 70%;
  padding: 24px 10px 24px 24px;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  font-size: 1.125rem;
  font-weight: 400;
  outline: none;
`;

const Placeholder = styled.div`
  width: 100%;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--gray-color);
  cursor: text;
`;

export { Wrapper, InputLabel, Input, Placeholder };
