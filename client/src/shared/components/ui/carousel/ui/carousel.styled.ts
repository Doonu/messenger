import styled from 'styled-components';
import { Carousel as CarouselAntd } from 'antd';

export const SCarouselAntd = styled(CarouselAntd)`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .ant-image {
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;

    max-width: 1200px;
    max-height: 700px;
    object-fit: cover;
  }
`;
