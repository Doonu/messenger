import styled, { css } from 'styled-components';
import { Badge } from 'antd';

interface ISBadge {
  $isAbsolute?: boolean;
}

export const SBadgeAntd = styled(Badge)<ISBadge>`
  ${({ $isAbsolute }) =>
    $isAbsolute &&
    css`
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 2;
    `}

  &.ant-badge .ant-badge-count {
    font-size: 10px;
  }
`;
