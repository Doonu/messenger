import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 5px 0 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-right: 15px;
  width: 100%;
  flex: 1;
`;

export const STop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SBottom = styled.div`
  font-size: 18px;
`;

export const STitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.active};
`;

export const STime = styled.div``;
