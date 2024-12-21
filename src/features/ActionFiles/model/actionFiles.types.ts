import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@entities/dialogs';

export interface IActionFilesProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  onTitle: (title: string) => void;
  onActive?: () => void;
  isActive?: boolean;
  statusPhoto: number;
}
