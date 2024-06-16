import styled from 'styled-components';

export const SSearchDialogsStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  padding: 15px 15px 10px 15px;
`;

export const SServices = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  & svg {
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`;
