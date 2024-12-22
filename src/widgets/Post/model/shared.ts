import { IPostState } from '@entities/post';

export interface IPost {
  post: IPostState;
}

export interface IPostAndDrag extends IPost {
  posts: IPostState[];
  warningEdit: boolean;
  editedPost: IPostState | undefined;
  deletedPost: IPostState[];
  openComments: () => void;
}
