import React, { FC } from 'react';
import { Image } from 'antd';

import { SCarouselAntd } from './carousel.styled';
import { ICarousel } from '../model/ICarousel';

export const Carousel: FC<ICarousel> = ({ children, photoList, ...props }) => {
  return (
    <SCarouselAntd dots arrows {...props}>
      {photoList.map((el) => {
        const url = el && el.url ? el.url : URL.createObjectURL(el.originFileObj as File);

        return <Image preview={false} key={el.uid} src={url} />;
      })}
    </SCarouselAntd>
  );
};
