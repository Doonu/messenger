import { IAllFiles, IFilesPost } from 'shared/models/IPost';
import { IPostState } from '../../../../../../entities/post/model/IPost';

export interface IContent {
  post: IPostState;
  allFiles: IAllFiles;
}

export interface IPhoto {
  photos: IFilesPost[];
}
