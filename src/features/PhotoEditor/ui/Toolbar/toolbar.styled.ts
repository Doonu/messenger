import styled, { css } from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 15px;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.bg};
  height: 50px;
`;

interface IContainerIcons {
  $isActive: boolean;
}

export const SContainerIcons = styled.div<IContainerIcons>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg};
  width: 30px;
  height: 30px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      border-bottom: 3px solid ${({ theme }) => theme.colors.active};

      & svg {
        color: white !important;
      }
    `};
`;
