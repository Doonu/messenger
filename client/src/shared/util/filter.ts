/*
 *   Нахождение фотографий и файлов из расширения всех файлов
 *
 *   type = 'file' -> ['jpg', 'png', 'webp', 'doc', 'docx'] = ['doc', 'docx']
 *   type = 'photo' -> ['jpg', 'png', 'webp', 'doc', 'docx'] = ['jpg', 'png', 'webp']
 * */

import { IFilesPost } from '../models/IPost';

export const extensionPhotoList = ['jpg', 'png', 'webp', 'svg', 'gif', 'jpeg', 'bmp'];
export const extensionFileList = ['doc', 'docx', 'pdf', 'txt'];

interface IPhotosFilter {
  photos: IFilesPost[];
  type: 'file' | 'photo';
}

export const photosFilter = ({ photos, type }: IPhotosFilter) => {
  if (!photos) return [];

  return photos.filter(({ url }) => {
    const extension = url.split('.');
    const lastIndex = extension.length - 1;
    const searchList = type === 'file' ? extensionFileList : extensionPhotoList;
    return searchList.includes(extension[lastIndex]);
  });
};
