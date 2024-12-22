import styled, { css } from 'styled-components';

import { IBaseList } from '../model/baseList.types';

export const SBaseList = styled.div<IBaseList>`
  display: flex;
  flex-direction: column;
  
  ${({ $isPadding }) =>
    $isPadding &&
    css`
      gap: 10px;
      padding: 15px;
    `}}

  & > div:not(:last-child) {
    ${({ $isBorder, theme }) =>
      $isBorder &&
      css`
      border-bottom: 1px solid ${theme.colors.secondaryText}
      padding-bottom: 15px;
    `}
`;

export const SMore = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
`;
