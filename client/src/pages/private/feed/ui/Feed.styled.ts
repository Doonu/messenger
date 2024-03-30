import styled, { css } from 'styled-components';

export const DraggableContainer = styled.div`
  height: 100%;
`;

interface ISContainerList {
  $isLength: boolean;
}

export const SContainerList = styled.div<ISContainerList>`
  ${({ $isLength }) =>
    $isLength &&
    css`
      min-height: calc(100vh - 290px);
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;
