import styled from 'styled-components';
import { BlockContainer } from 'shared/styles/containers';
import { Close } from '../../../../shared/assets/icons';

export const SDialogList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SBlockContainer = styled(BlockContainer)`
  padding: 0;
`;

export const STags = styled.div`
  display: grid;
  gap: 10px;
  height: 45px;
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
