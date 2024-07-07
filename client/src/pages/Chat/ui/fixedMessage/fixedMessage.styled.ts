import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  cursor: pointer;

  padding: 10px 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SContainerIcon = styled.div`
  display: flex;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.active};
`;

export const SInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SName = styled.div`
  display: flex;
  gap: 10px;

  & > span {
    color: ${({ theme }) => theme.colors.link};
  }
`;

export const SMessage = styled.div`
  color: ${({ theme }) => theme.colors.active};
`;
