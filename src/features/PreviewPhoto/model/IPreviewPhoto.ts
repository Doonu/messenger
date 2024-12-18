import { Dispatch, SetStateAction } from 'react';
import { IAllFiles } from '@shared/models';
import { ModalProps, UploadFile } from 'antd';

export interface IPreviewPhotoProps extends Pick<ModalProps, 'open'> {
  description: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  photos: IAllFiles['photos'];
  onClose: () => void;
  updatePhoto: (uid: string, photo: UploadFile) => void;
}
