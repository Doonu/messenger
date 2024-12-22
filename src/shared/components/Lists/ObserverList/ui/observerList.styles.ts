import styled from 'styled-components';

import { ISList } from '../model/observerList.types';

export const SList = styled.div<ISList>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap && `${$gap}px`};
`;
