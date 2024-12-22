import styled from 'styled-components';
import { Select } from 'antd';

import { ISelectProps } from '../model/select.types';

export const SSelect = styled(Select)<ISelectProps>`
  width: ${({ width }) => width};

  .ant-select-selection {
    background: ${({ theme }) => theme.colors.secondaryBg} !important;
    color: ${({ theme }) => theme.colors.active};
  }

  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.white};
  }
`;
