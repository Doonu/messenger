import { UploadFile } from 'antd';

export interface FileTypes {
  onDelete: () => void;
  isModify?: boolean;
  file: UploadFile;
}
