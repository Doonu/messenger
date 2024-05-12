import styled from 'styled-components';
import BaseButton from 'components/ui/buttons/baseButton';

export const SContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto auto 1fr;
`;

export const SHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
  padding: 15px 15px 10px 15px;
  border-radius: 10px 10px 0 0;
  color: ${({ theme }) => theme.colors.active};
`;

export const SFormSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 15px 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SFormCreate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  gap: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SBaseButton = styled(BaseButton)`
  flex: 0;
`;

export const SFriends = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;
  padding: 15px 15px 10px 15px;
  height: calc(100vh - 440px);

  &::-webkit-scrollbar {
    width: 10px;
    margin: 5px !important;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 15px;
  }
`;
