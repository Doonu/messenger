import styled from 'styled-components';
import { Typography } from 'antd';
import Badge from 'shared/components/custom/signals/badge';

interface ISContainer {
  $isRead: boolean;
}

export const SContainer = styled.div<ISContainer>`
  display: flex;
  gap: 15px;
  padding: 15px 10px 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
  cursor: pointer;
  background: ${({ $isRead, theme }) => !$isRead && theme.colors.secondaryText};
  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryText};
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 15px;
  flex: 1;
`;

export const STop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SLastMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
`;

export const SMessage = styled(Typography.Text).attrs({
  ellipsis: true,
})`
  color: ${({ theme }) => theme.colors.text};
  width: 300px !important;
  font-size: 14px;
`;

export const STitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.active};
`;

export const STime = styled.div``;

export const SBadge = styled(Badge)`
  &.ant-badge .ant-badge-count {
    background: ${({ theme }) => theme.colors.active};
  }

  .ant-scroll-number-only-unit {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 12px;
  }
`;
