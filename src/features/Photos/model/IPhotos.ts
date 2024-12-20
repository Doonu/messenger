import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@entities/dialogs';

export interface IPhotos {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPreviewPhoto: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
}
