import { IAllFiles } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';
import { IPostAndDrag } from '@widgets/items';

export interface IModification extends Pick<IPostAndDrag, 'post'> {
  allFiles: IAllFiles;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}
