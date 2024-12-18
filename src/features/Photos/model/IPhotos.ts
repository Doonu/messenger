import { IAllFiles } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';

export interface IPhotos {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPreviewPhoto: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
}
