import React, { FC } from 'react';
import { HorizontalList, Photo } from '@shared/components';
import { IFilesPost } from '@shared/models';

import { IPhotos } from './model/IPhotos';

export const Photos: FC<IPhotos> = ({
  setIsPreviewPhoto,
  loader,
  setData,
  data,
  setCurrentIndex,
}) => {
  const handleDelete = (id: string) => {
    const filteredList = data.photos.filter((file) => file.id !== id);
    setData({ ...data, photos: filteredList });
  };

  const handleOpenModalPhoto = (index: number) => {
    setCurrentIndex(index + 1);
    setIsPreviewPhoto(true);
  };

  return (
    <HorizontalList<IFilesPost>
      list={data.photos}
      loading={loader}
      itemContent={(file, index) => (
        <Photo
          onClick={() => handleOpenModalPhoto(index)}
          key={file.id}
          onDelete={() => handleDelete(file.id)}
          url={`http://localhost:3000/${file.url}`}
        />
      )}
    />
  );
};
