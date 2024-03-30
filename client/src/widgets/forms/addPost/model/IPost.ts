import { IPostState } from '../../../../entities/post/model/IPost';

export type IPost = Pick<IPostState, 'content' | 'isDisabledComments'> & {
  isActive: boolean;
  isWarningModal: boolean;
  isDraggablePhotoFocus: boolean;
  view: 'slider' | 'grid';

  isWarningModalTitle: string;
};
