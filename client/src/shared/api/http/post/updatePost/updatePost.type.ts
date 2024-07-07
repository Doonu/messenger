import { IPostState } from '@entities/post';

export type IPostUpdate = Pick<
  IPostState,
  'content' | 'files' | 'isDisabledComments' | 'view' | 'id'
> & {
  status: number;
};
