import { IAllFiles, IFilesPost } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';

export interface IPreviewPhotoProps {
  list: IFilesPost[];
  setList: Dispatch<SetStateAction<IAllFiles>>;
  description: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}
