import { IPostState } from '@entities/post';

export interface IActions {
  post: IPostState;
  commentLength: number;
  onActiveComments: () => void;
}
