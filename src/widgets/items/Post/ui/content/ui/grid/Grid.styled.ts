import styled, { css } from 'styled-components';

interface ISContainer {
  $length: number;
}

interface ISImg {
  $length: number;
  $radius: string;
}

export const SContainer = styled.div<ISContainer>`
  border-radius: 15px;
  display: grid;

  ${({ $length }) =>
    $length % 2 === 1 &&
    css`
      & > img:last-child {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    `}

  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

export const SImg = styled.img<ISImg>`
  object-fit: cover;
  object-position: 50% 0;
  border-radius: ${({ $radius }) => $radius};

  width: 100%;
  height: ${({ $length }) => $length && $length >= 4 && '200px'} !important;
  height: ${({ $length }) => $length && $length > 1 && $length < 4 && '250px'} !important;
`;
