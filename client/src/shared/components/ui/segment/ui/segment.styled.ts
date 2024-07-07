import styled from 'styled-components';
import { Segmented } from 'antd';

export const SSegmented = styled(Segmented)`
  .ant-segmented-item-selected {
    background: ${({ theme }) => theme.colors.secondaryText};
    color: ${({ theme }) => theme.colors.active};
  }
`;
