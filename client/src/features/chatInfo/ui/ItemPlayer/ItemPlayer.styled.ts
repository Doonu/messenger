import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 15px;
`;

export const SProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue};
`;

export const SName = styled.div`
  font-size: 15px;
`;

export const SInfoConnected = styled.div`
  color: ${({ theme }) => theme.colors.active};
`;
