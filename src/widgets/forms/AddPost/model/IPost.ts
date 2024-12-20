import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@entities/dialogs';

export interface IContainerFormProps {
  allFiles: IAllFiles;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPreviewPhoto: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
  setIsWarningModal: Dispatch<SetStateAction<boolean>>;
  setWarningModalTitle: Dispatch<SetStateAction<string>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
