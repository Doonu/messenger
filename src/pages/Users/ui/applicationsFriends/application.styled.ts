import styled from 'styled-components';
import { BlockContainer } from '@shared/styles';

export const SBlockContainer = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const SListFriendRequest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const STitle = styled.div`
  color: ${({ theme }) => theme.colors.active};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
  padding-bottom: 20px;
  font-size: 18px;

  & > span {
    font-size: 20px;
  }
`;
