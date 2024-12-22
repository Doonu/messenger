import styled, { css } from 'styled-components';

import { IImgProps } from '../model/photoProfile.types';

export const SContainer = styled.div<IImgProps>`
  position: relative;
  background: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize && `${$fontSize}px`};
  min-width: ${({ $size }) => $size && `${$size}px`};
  height: ${({ $size }) => $size && `${$size}px`};
  border-radius: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.active};

  ${({ $isAbsolute, $top, $left }) =>
    $isAbsolute &&
    css`
      position: absolute;
      top: ${$top}px;
      left: ${$left}px;
    `};
`;

export const SImg = styled.img<Omit<IImgProps, '$fontSize' | '$color'>>`
  min-width: ${({ $size }) => $size && `${$size}px`};
  height: ${({ $size }) => $size && `${$size}px`};
  object-fit: cover;
  margin: 0;
  border-radius: 99%;
  flex: 1;

  ${({ $isAbsolute, $top, $left }) =>
    $isAbsolute &&
    css`
      position: absolute;
      top: ${$top}px;
      left: ${$left}px;
    `};
`;
