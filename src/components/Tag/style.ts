import styled from 'styled-components';

const Button = styled.button`
  border: 0;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  cursor: pointer;
  background-color: var(--skyblue-color);
  color: var(--blue-color);
  padding: 8px 16px;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  border-radius: 20px;

  &:focus {
    outline: 2px solid var(--blue-color);
  }
`;

export { Button };
