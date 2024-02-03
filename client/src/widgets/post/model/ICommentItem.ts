import { ICommentsState } from '../../../entities/post/model/IPost';
import { Dispatch, SetStateAction } from 'react';

export interface ICommentItem {
  comment: ICommentsState;
  onDelete: () => void;
  onEdit: () => void;
  handlerEdit: (content: string | null, id?: number) => void;
  userPostId: number;
  setComments: Dispatch<SetStateAction<ICommentsState[]>>;
}
