import styled, { css } from 'styled-components';

interface ISContainer {
  $length: number;
}

interface ISImg {
  $index: number;
  $length: number;
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

  border-radius: ${({ $index, $length }) =>
    $index === 0 && $length > 2
      ? '15px 0 0 0'
      : $index === 0 && $length === 2
      ? '15px 0 0 15px'
      : $index === 1 && $length > 2
      ? '0 15px 0 0'
      : $index === 1 && $length === 2
      ? '0 15px 15px 0'
      : $length % 2 === 1 && $index === $length - 1
      ? '0 0 15px 15px'
      : $length % 2 !== 1 && $index === $length - 2
      ? '0 0 0 15px'
      : $length % 2 !== 1 && $index === $length - 1
      ? '0 0 15px 0'
      : ''};

  height: ${({ $length }) => $length && $length >= 4 && '200px'} !important;
  height: ${({ $length }) => $length && $length > 1 && $length < 4 && '250px'} !important;
`;
