import styled from 'styled-components';

export const SNotifyItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
`;

export const SContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SDate = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;
