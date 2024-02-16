import styled, { css } from 'styled-components';

interface ISContainerComments {
  $isBorder: boolean;
}

export const SContainerComments = styled.div<ISContainerComments>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;

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
