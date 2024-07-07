import React, { useEffect, FC, KeyboardEvent, useRef } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import { BigPhoto } from '@shared/components';

import {
  SCarouselAntd,
  SContainer,
  SImgContainer,
  SArrowLeft,
  SArrowRight,
} from './carousel.styled';
import { ICarousel } from '../model/ICarousel';

export const Carousel: FC<ICarousel> = ({
  children,
  photoList,
  currentSlide,
  setCurrentSlide,
  fixedMinHeight = 500,
  ...props
}) => {
  const slider = useRef<CarouselRef>(null);

  const handleLeft = () => {
    slider?.current?.prev();
    if (!currentSlide || !setCurrentSlide) return false;

    if (currentSlide !== 1) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(photoList.length);
    }
  };

  const handleRight = () => {
    slider?.current?.next();
    if (!currentSlide || !setCurrentSlide) return false;

    if (currentSlide < photoList.length) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'ArrowRight') handleRight();
    if (e.code === 'ArrowLeft') handleLeft();
  };

  useEffect(() => {
    if (currentSlide) {
      slider?.current?.goTo(currentSlide - 1);
    }
  }, [currentSlide]);

  return (
    <SContainer onKeyDown={handleKeyDown}>
      <SCarouselAntd ref={slider} dots {...props}>
        {photoList.map(({ url, dimensions, id }) => (
          <SImgContainer key={id}>
            {photoList.length > 1 && (
              <>
                <SArrowLeft onClick={handleLeft} />
                <SArrowRight onClick={handleRight} />
              </>
            )}
            <BigPhoto
              fixedMinSize={fixedMinHeight}
              dimensions={dimensions}
              url={`http://localhost:3000/${url}`}
            />
          </SImgContainer>
        ))}
      </SCarouselAntd>
    </SContainer>
  );
};
