import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from 'shared/models/IPost';

export interface IRestoreProps {
  postId: number;
  setIsDeletedPost: Dispatch<SetStateAction<boolean>>;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}
