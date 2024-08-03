import React, { FC } from 'react';
import { BigPhoto } from '@shared/components';

import { SCarouselAntd, SImgContainer } from './carousel.styled';
import { ICarousel } from '../model/ICarousel';

// TODO: dimension
export const Carousel: FC<ICarousel> = ({ children, photoList, ...props }) => {
  return (
    <SCarouselAntd dots arrows {...props}>
      {photoList.map((el) => (
        <SImgContainer key={el.uid}>{el.url && <BigPhoto url={el.url} />}</SImgContainer>
      ))}
    </SCarouselAntd>
  );
};
