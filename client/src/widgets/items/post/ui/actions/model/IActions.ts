import { IPostState } from 'entities/post/model/IPost';

export interface IActions {
  post: IPostState;
  commentLength: number;
  onActiveComments: () => void;
}
