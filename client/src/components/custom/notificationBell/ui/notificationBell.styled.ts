import styled from 'styled-components';

export const SNotificationBellStyled = styled.div`
  width: 400px;
  background: #2b2d31;
  border: 1px solid #4c4d52;
  margin-top: 28px;
  color: ${({ theme }) => theme.colors.active};
`;
