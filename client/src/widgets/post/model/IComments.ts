import { ICommentsState, IPostState } from '../../../entities/post/model/IPost';
import { Dispatch, SetStateAction } from 'react';

export interface CommentsProps {
  post: IPostState;
  comments: ICommentsState[];
  setComments: Dispatch<SetStateAction<ICommentsState[]>>;
}
