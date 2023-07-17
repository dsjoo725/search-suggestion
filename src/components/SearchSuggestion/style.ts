import styled from 'styled-components';

const Wrapper = styled.div`
  background: var(--white-color);
  border-radius: 1.5rem;
  max-width: 490px;
  width: 100%;
  padding-block: 24px;

  position: absolute;
  top: 80px;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;
const Title = styled.div`
  font-size: 0.9rem;
  color: var(--darkgray-color);
  padding: 8px 24px;
`;
const SubContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  color: var(--gray-color);

  padding: 8px 24px;
`;
const Content = styled.button`
  border: none;
  width: 100%;
  background: var(--white-color);

  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.6;
  padding: 8px 24px;

  display: flex;
  align-items: center;
  gap: 12px;

  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
  &:focus {
    background: rgba(0, 0, 0, 0.03);
    outline: 0;
    border-radius: 0.125rem;
  }
`;

const TagList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 24px;
`;

const Dvider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-block: 16px;
`;

export { Wrapper, Title, SubContent, Content, Dvider, TagList };
