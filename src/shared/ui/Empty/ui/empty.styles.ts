import styled from 'styled-components';
import { Empty as EmptyAntd } from 'antd';

export const SEmptyAntd = styled(EmptyAntd)`
  & .ant-empty-image svg {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SMessage = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 1000;
  text-transform: uppercase;
`;
