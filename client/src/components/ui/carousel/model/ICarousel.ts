import { CarouselProps } from 'antd';
import { IFilesPost } from 'shared/models/IPost';
import { Dispatch, SetStateAction } from 'react';

export interface ICarousel extends CarouselProps {
  photoList: IFilesPost[];
  currentSlide?: number;
  setCurrentSlide?: Dispatch<SetStateAction<number>>;
  fixedMinHeight?: number;
}
