import styled, { css } from 'styled-components';

interface IPositionProps {
  $position: boolean;
  $isDraggable?: boolean;
}

export const SContainer = styled.div<IPositionProps>`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  height: max-content;
  padding-right: 15px;

  &:first-child {
    align-self: flex-start;
  }
  ${({ $isDraggable }) =>
    css`
      opacity: ${$isDraggable ? '0' : '1'};
    `}
`;
