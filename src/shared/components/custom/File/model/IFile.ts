import { IFilesPost } from '@shared/models';

export interface IFile extends Pick<IFilesPost, 'originalName' | 'size' | 'url'> {
  onDelete: () => void;
  isModify?: boolean;
}
