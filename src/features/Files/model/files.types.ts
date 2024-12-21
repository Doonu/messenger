import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@entities/dialogs';

export interface IFilesProps {
  data: IAllFiles;
  setData?: Dispatch<SetStateAction<IAllFiles>>;
  loader?: boolean;
  isModify?: boolean;
}
