import { IAllFiles } from '@shared/models';
import { IPostState } from '@entities/post';
import { UploadFile } from 'antd';

export interface IContent {
  post: IPostState;
  allFiles: IAllFiles;
}

export interface IPhoto {
  photos: UploadFile[];
}
