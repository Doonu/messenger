import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@entities/dialogs';

export interface IRestoreProps {
  postId: number;
  setIsDeletedPost: Dispatch<SetStateAction<boolean>>;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}
