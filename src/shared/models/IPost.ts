export interface IFilesPost {
  id: string;
  url: string;
  originalName: string;
  size: number;
  type: string;
  dimensions: {
    height: number;
    width: number;
  };
}

export interface IAllFiles {
  photos: IFilesPost[];
  files: IFilesPost[];
}

export interface IToggleCommentsById {
  postId: number;
  isDisabledComments: boolean;
}

export interface ILikePost {
  isLike: boolean;
  postId: number;
}

export interface ILikeComments {
  commentId: number;
  isLike: boolean;
}
