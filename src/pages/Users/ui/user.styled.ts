import styled from 'styled-components';
import { BlockContainer } from '@shared/styles';

export const SContainerUsers = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 20px;
`;

export const STitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.active};
`;
