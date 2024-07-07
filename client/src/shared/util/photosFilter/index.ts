/*
 *   Нахождение фотографий и файлов из расширения всех файлов
 *
 *   type = 'Index' -> ['jpg', 'png', 'webp', 'doc', 'docx'] = ['doc', 'docx']
 *   type = 'Index' -> ['jpg', 'png', 'webp', 'doc', 'docx'] = ['jpg', 'png', 'webp']
 * */

import { IPhotosFilter } from './photosFilter.type';

export const extensionPhotoList = ['jpg', 'png', 'webp', 'svg', 'gif', 'jpeg', 'bmp'];
export const extensionFileList = ['doc', 'docx', 'pdf', 'txt'];

export const photosFilter = ({ photos, type }: IPhotosFilter) => {
  if (!photos) return [];

  return photos.filter(({ url }) => {
    const extension = url.split('.');
    const lastIndex = extension.length - 1;
    const searchList = type === 'file' ? extensionFileList : extensionPhotoList;
    return searchList.includes(extension[lastIndex]);
  });
};
