import { ModalProps } from 'antd';

export interface WarningCountPhotosProps extends Pick<ModalProps, 'open'> {
  message: string;
  onClose: () => void;
}
