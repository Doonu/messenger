import styled from 'styled-components';

export const SNotifyItem = styled.div`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 10px;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SInfo = styled.div`
  display: flex;
`;

export const SUser = styled.div`
  padding: 10px 5px;
`;

export const SClose = styled.div`
  align-self: normal;
  flex: 0;

  display: flex;
  align-items: center;
  padding: 0 5px;

  border-left: 1px solid ${({ theme }) => theme.colors.secondaryText};

  &:hover {
    opacity: 0.7;
  }
`;

export const SContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
`;

export const SDate = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;
