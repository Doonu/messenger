export interface ICommentsState {
  id: number;
  content: string[];
  createdAt: string;
  updatedAt: string;
  likesList: number[];
  postId: number;
  countLikes: number;
  author: {
    name: string;
    imgSubstitute: string;
    id: number;
    statusConnected: boolean;
    timeConnected: number;
  };
  isEdit: boolean;
}

export interface IRecalculationOfComments {
  id: number;
  action: 0 | 1; // 0 - удаление, 1 - прибавление
}
