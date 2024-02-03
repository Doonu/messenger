import styled from 'styled-components';

interface IBigPhotoPropsStyles {
  $fixedMinHeight: number;
  $width?: number;
  $height?: number;
}

export const SImageContainer = styled.div<IBigPhotoPropsStyles>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $fixedMinHeight }) => $fixedMinHeight}px;
`;

export const SImage = styled.img<IBigPhotoPropsStyles>`
  object-fit: contain;
  border-radius: 15px;
  max-height: ${({ $fixedMinHeight }) => $fixedMinHeight}px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;
