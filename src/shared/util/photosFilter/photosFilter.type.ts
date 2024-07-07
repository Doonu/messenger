import { IFilesPost } from '@shared/models';

export interface IPhotosFilter {
  photos: IFilesPost[];
  type: 'file' | 'Photo';
}
