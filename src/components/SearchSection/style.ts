import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--skyblue-color);
  padding-block: 60px 180px;
  gap: 24px;
`;

const Header = styled.h1`
  font-size: 2.125rem;
  text-align: center;
  letter-spacing: -0.018em;
  line-height: 1.6;
`;

export { Wrapper, Header };
