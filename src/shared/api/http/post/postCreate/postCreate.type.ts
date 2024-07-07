import { IPostState } from '@entities/post';

export type IPostCreate = Pick<IPostState, 'content' | 'isDisabledComments' | 'view' | 'files'> & {
  status: number;
};
