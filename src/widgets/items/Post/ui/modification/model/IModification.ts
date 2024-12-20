import { Dispatch, SetStateAction } from 'react';
import { IPostAndDrag } from '@widgets/items';
import { IAllFiles } from '@entities/dialogs';

export interface IModification extends Pick<IPostAndDrag, 'post'> {
  allFiles: IAllFiles;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}
