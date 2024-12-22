import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';

export const SLink = styled.div`
  cursor: pointer;
`;

export const SMore = styled(FiMoreHorizontal).attrs(({ theme }) => ({
  color: theme.colors.active,
}))``;
