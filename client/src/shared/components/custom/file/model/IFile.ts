import { UploadFile } from 'antd';

export interface IFile {
  onDelete: () => void;
  isModify?: boolean;
  file: UploadFile;
}
