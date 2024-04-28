import styled from 'styled-components';
import { BlockContainer } from 'shared/styles/containers';

export const SDialogList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SBlockContainer = styled(BlockContainer)`
  padding: 0;

  & > div {
    padding: 15px 0 15px 15px;
  }
`;
