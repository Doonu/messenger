import styled from 'styled-components';

export const SName = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const SItemRequest = styled.div`
  display: flex;
  gap: 30px;
`;
