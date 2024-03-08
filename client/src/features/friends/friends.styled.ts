import styled from 'styled-components';
import { Typography } from 'antd';

export const STitle = styled.h5`
  margin-bottom: 15px;
  & span {
    color: ${({ theme }) => theme.colors.active};
    font-size: 16px;
  }
`;

export const SUsers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SUser = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
`;

export const SName = styled(Typography.Text).attrs({
  ellipsis: true,
})`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.active};
`;
