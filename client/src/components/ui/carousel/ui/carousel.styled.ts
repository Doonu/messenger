import styled from 'styled-components';
import { Carousel as CarouselAntd } from 'antd';

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
