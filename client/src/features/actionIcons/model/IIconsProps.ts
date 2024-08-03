import { IAllFiles } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';

export interface IIconsProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  onTitle: (title: string) => void;
  onActive?: () => void;
  isActive?: boolean;
  statusPhoto: number;
}
