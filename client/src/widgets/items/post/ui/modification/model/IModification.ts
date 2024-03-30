import { IPostAndDrag } from 'widgets/items/post/model/shared';
import { IAllFiles } from 'shared/models/IPost';
import { Dispatch, SetStateAction } from 'react';

export interface IModification
  extends Pick<IPostAndDrag, 'isDraggablePhotoInPost' | 'post' | 'handlerChange'> {
  allFiles: IAllFiles;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}
