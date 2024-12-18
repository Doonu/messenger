import { IAllFiles } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';

export interface IFilesProps {
  data: IAllFiles;
  setData?: Dispatch<SetStateAction<IAllFiles>>;
  loader?: boolean;
  isModify?: boolean;
}
