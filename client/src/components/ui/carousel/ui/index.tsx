import React, { useEffect, FC, KeyboardEvent, useRef } from 'react';
import { SCarouselAntd, SImgContainer } from './carousel.styled';
import {
  SArrowLeft,
  SArrowRight,
} from '../../../navigation/modal/content/previewPhoto/ui/previewPhoto.styled';
import { CarouselRef } from 'antd/es/carousel';
import BigPhoto from '../../photos/bigPhoto';
import { ICarousel } from '../model/ICarousel';

const Carousel: FC<ICarousel> = ({
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
    currentSlide && slider?.current?.goTo(currentSlide - 1);
  }, [currentSlide]);

  return (
    <div onKeyDown={handleKeyDown}>
      <SCarouselAntd ref={slider} dots {...props}>
        {photoList.map(({ url, dimensions, id }) => (
          <SImgContainer key={id}>
            {photoList.length > 1 && (
              <>
                <SArrowLeft onClick={handleLeft} />
                <SArrowRight onClick={handleRight} />
              </>
            )}
            <BigPhoto fixedMinSize={fixedMinHeight} dimensions={dimensions} url={url} />
          </SImgContainer>
        ))}
      </SCarouselAntd>
    </div>
  );
};

export default Carousel;
