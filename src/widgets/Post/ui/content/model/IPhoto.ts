import { IPostState } from '@entities/post';
import { UploadFile } from 'antd';
import { IAllFiles } from '@entities/dialogs';

export interface IContent {
  post: IPostState;
  allFiles: IAllFiles;
}

export interface IPhoto {
  photos: UploadFile[];
}
