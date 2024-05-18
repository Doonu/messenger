import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';

export const SMore = styled(FiMoreHorizontal)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.active};
`;
