import { CarouselProps, UploadFile } from 'antd';

export interface ICarousel extends CarouselProps {
  photoList: UploadFile[];
  fixedMinHeight?: number;
}
