import styled from 'styled-components';
import { BlockContainer } from '@shared/styles';

import { Close } from '../../../../shared/assets/icons';

export const SDialogList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 260px);
  overflow: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};

  &::-webkit-scrollbar {
    width: 0;
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

export const SBlockContainer = styled(BlockContainer)`
  padding: 0;
  overflow: hidden;
`;

export const STags = styled.div`
  display: grid;
  gap: 10px;
`;

export const STag = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  color: ${({ theme }) => theme.colors.active};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 5px;
`;

export const SClose = styled(Close)`
  font-size: 20px;
  align-self: flex-end;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
