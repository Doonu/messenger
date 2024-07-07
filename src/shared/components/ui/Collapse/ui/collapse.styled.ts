import styled from 'styled-components';
import { Collapse } from 'antd';

export const SContainer = styled(Collapse)`
  background: ${({ theme }) => theme.colors.secondaryBg};
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};

  .ant-collapse-content-active {
    background: ${({ theme }) => theme.colors.secondaryBg};
    border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
  }

  .ant-collapse-content-box {
    padding: 0 !important;
  }

  & .ant-collapse-content {
    border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
    background: ${({ theme }) => theme.colors.secondaryBg};
  }

  .ant-collapse-item {
    border-bottom: 0;
  }

  & .ant-collapse-header {
    padding: 0 !important;
  }

  .ant-collapse-expand-icon {
    display: none !important;
  }
`;
