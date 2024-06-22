import styled from 'styled-components';

interface ISList {
  $gap: number;
}

export const SList = styled.div<ISList>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap && `${$gap}px`};
`;

export const ObserverBlock = styled.div``;
