import styled from 'styled-components';
import { BlockContainer } from '../../../shared/styles/containers';
import { Typography } from 'antd';

export const SBlockContainer = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
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

export const SName = styled(Typography.Text)`
  color: ${({ theme }) => theme.colors.active};
  font-size: 16px;
  font-weight: 700;
  line-height: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SListFriendRequest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
