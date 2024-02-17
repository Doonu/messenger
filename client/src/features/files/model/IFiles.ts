import { IAllFiles } from '../../../shared/models/IPost';
import { Dispatch, SetStateAction } from 'react';

export interface IFilesProps {
  data: IAllFiles;
  setData?: Dispatch<SetStateAction<IAllFiles>>;
  loader?: boolean;
  isModify?: boolean;
}
