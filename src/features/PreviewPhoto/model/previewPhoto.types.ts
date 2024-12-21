import { Dispatch, SetStateAction } from 'react';
import { ModalProps, UploadFile } from 'antd';
import { IAllFiles } from '@entities/dialogs';

export interface IPreviewPhotoProps extends Pick<ModalProps, 'open'> {
  description: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  photos: IAllFiles['photos'];
  onClose: () => void;
  updatePhoto: (uid: string, photo: UploadFile) => void;
}
