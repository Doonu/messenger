import React, { FC, useEffect, useRef, useState } from 'react';
import { SImage, SImageContainer } from './bigPhoto.styled';

interface IBigPhoto {
  fixedMinSize: number;
  url: string;
  onClick?: () => void;
  dimensions: {
    height: number;
    width: number;
  };
}

const BigPhoto: FC<IBigPhoto> = ({ fixedMinSize, url, onClick, dimensions }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const sizePhoto = () => {
    if (dimensions.width >= dimensions.height) {
      let ratioOfNumbers = dimensions.width / dimensions.height;

      if (containerRef?.current?.offsetWidth) {
        setHeight(fixedMinSize / ratioOfNumbers);
        setWidth(containerRef.current.offsetWidth);
      }
    }
    if (dimensions.width < dimensions.height) {
      let ratioOfNumbers = dimensions.width / dimensions.height;
      setWidth(fixedMinSize / ratioOfNumbers);
      setHeight(fixedMinSize);
    }
  };

  useEffect(() => {
    sizePhoto();
  }, [containerRef?.current?.offsetWidth]);

  return (
    <SImageContainer onClick={onClick} ref={containerRef} $fixedMinHeight={fixedMinSize}>
      <SImage
        alt="Картинка поста"
        draggable="false"
        $width={width}
        $height={height}
        $fixedMinHeight={fixedMinSize}
        src={url}
      />
    </SImageContainer>
  );
};

export default BigPhoto;
