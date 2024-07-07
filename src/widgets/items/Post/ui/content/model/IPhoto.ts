import { IAllFiles, IFilesPost } from '@shared/models';
import { IPostState } from '@entities/post';

export interface IContent {
  post: IPostState;
  allFiles: IAllFiles;
}

export interface IPhoto {
  photos: IFilesPost[];
}
