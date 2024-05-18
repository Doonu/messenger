import { IPostState } from 'entities/post/model/IPost';

export interface IPost {
  post: IPostState;
}

export interface IPostAndDrag extends IPost {
  isDraggablePhotoInPost: boolean;
  handlerChange: () => void;
  posts: IPostState[];
  warningEdit: boolean;
  editedPost: IPostState | undefined;
  deletedPost: IPostState[];
  openComments: () => void;
}
