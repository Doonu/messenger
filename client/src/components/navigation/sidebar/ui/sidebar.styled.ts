import styled, { css } from 'styled-components';
import { SidebarProps } from '../model/ISidebar';

export const SContainer = styled.div<SidebarProps>`
  min-width: ${({ $width }) => ($width === 'small' ? '200px' : '250px')};
  max-width: ${({ $width }) => ($width === 'small' ? '200px' : '250px')};

  @media (max-width: ${({ theme }) => theme.breakpoints.bigDesktop}) {
    display: none;
  }
`;
