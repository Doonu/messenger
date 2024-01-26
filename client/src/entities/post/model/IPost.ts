export interface IPostState {
  id: number;
  userId: number;
  content: string[];
  countLikes: number;
  likesList: number[];
  shared: number;
  comments: ICommentsState[];
  files: {
    id: string;
    url: string;
    size: number;
    originalName: string;
    type: string;
  }[];
  createdAt: string;
  updatedAt: string;
  view: string;
  isDisabledComments: boolean;
  author: {
    name: string;
    imgSubstitute: string;
  };
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
