import { IAllFiles } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';
import { ActionFiles } from '@features/ActionIcons';

export interface IActionFilesProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  onTitle: (title: string) => void;
  onActive?: () => void;
  isActive?: boolean;
  statusPhoto: number;
}
