import styled from 'styled-components';
import { BlockContainer } from '../../shared/styles/containers';

export const SBlockContainer = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const STitle = styled.div`
  color: ${({ theme }) => theme.colors.active};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
  padding-bottom: 20px;

  & > span {
    font-size: 18px;
  }
`;

export const SListFriendRequest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
