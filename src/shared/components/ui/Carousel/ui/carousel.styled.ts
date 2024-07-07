import styled from 'styled-components';
import { Carousel as CarouselAntd } from 'antd';
import { ArrowLeft, ArrowRight } from '@shared/assets';

export const SContainer = styled.div`
  width: 100%;
`;

export const SCarouselAntd = styled(CarouselAntd)`
  height: 100%;
  width: 100%;

  .slick-slide {
    * > div {
      min-height: 100%;
    }
  }
`;

export const SImgContainer = styled.div`
  position: relative;
  width: max-content;
  border-radius: 118px 0 0 0;
`;

export const SArrowLeft = styled(ArrowRight)`
  position: absolute;
  top: 45%;
  left: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
  }
`;

export const SArrowRight = styled(ArrowLeft)`
  position: absolute;
  top: 45%;
  right: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;
