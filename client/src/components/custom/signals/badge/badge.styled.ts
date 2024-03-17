import styled from 'styled-components';
import { Badge } from 'antd';

export const SBadgeAntd = styled(Badge)`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 2;

  &.ant-badge .ant-badge-count {
    font-size: 10px;
  }
`;
