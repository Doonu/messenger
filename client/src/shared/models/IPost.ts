import { UploadFile } from 'antd';

export type IPost = {
  isDisabledComments: boolean;
  content: string[];
  view: 'slider' | 'grid';
};

export interface IAllFiles {
  photos: UploadFile[];
  files: UploadFile[];
}

export interface IAllFilesBlob {
  photos: Blob[];
  files: Blob[];
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
