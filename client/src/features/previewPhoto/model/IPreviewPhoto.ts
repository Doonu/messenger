import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@shared/models';

export interface IPreviewPhotoProps {
  description: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  photos: IAllFiles['photos'];
}
