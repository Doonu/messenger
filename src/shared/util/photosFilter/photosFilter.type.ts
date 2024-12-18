import { UploadFile } from 'antd';

export interface IPhotosFilter {
  photos: UploadFile[];
  type: 'file' | 'Photo';
}
