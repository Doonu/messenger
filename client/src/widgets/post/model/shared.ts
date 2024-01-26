import { IPostState } from '../../../entities/post/model/IPost';

export interface IPost {
  post: IPostState;
}

export interface IPostAndDrag extends IPost {
  isDraggablePhotoInPost: boolean;
  handlerChange: () => void;
}
