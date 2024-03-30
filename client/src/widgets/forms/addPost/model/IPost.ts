import { IPostState } from 'entities/post/model/IPost';
import { IAllFiles } from 'shared/models/IPost';
import { Dispatch, SetStateAction } from 'react';

export type IPost = Pick<IPostState, 'content' | 'isDisabledComments'> & {
  isActive: boolean;
  isWarningModal: boolean;
  isDraggablePhotoFocus: boolean;
  view: 'slider' | 'grid';

  isWarningModalTitle: string;
};

export interface IContainerFormProps {
  isDraggablePhoto: boolean;
  handlerChange: () => void;
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPreviewPhoto: Dispatch<SetStateAction<boolean>>;
}

export interface IPostProps {
  isDraggablePhoto: boolean;
  handlerChange: () => void;
}
