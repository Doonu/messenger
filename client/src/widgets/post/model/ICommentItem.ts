import { ICommentsState } from '../../../entities/post/model/IPost';

export interface ICommentItem {
  comment: ICommentsState;
  onDelete: () => void;
  onEdit: () => void;
  handlerEdit: (content: string | null, id?: number) => void;
  userPostId: number;
}
