import styled from 'styled-components';

export const SNotificationBellStyled = styled.div`
  width: 400px;
  background: ${({ theme }) => theme.colors.secondaryBg};
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-left: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-right: 1px solid ${({ theme }) => theme.colors.secondaryText};
  margin-top: 28px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SList = styled.div`
  max-height: 450px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SContent = styled.div`
  position: relative;
`;
