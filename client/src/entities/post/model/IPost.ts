import { IFilesPost } from '../../../shared/models/IPost';

export interface IPostState {
  id: number;
  userId: number;
  content: string[];
  countLikes: number;
  likesList: number[];
  shared: number;
  comments: number;
  files: IFilesPost[];
  createdAt: string;
  updatedAt: string;
  view: 'slider' | 'grid';
  isDisabledComments: boolean;
  author: {
    name: string;
    imgSubstitute: string;
  };
}

export interface ApiPostState extends Omit<IPostState, 'comments'> {
  comments: ICommentsState[];
}

export interface ICommentsState {
  id: number;
  content: string[];
  createdAt: string;
  updatedAt: string;
  likesList: number[];
  postId: number;
  author: {
    name: string;
    imgSubstitute: string;
    id: number;
  };
  isEdit: boolean;
}

export interface IRecalculationOfComments {
  id: number;
  action: 0 | 1; // 0 - удаление, 1 - прибавление
}
