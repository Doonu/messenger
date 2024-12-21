import React, { FC } from 'react';
import { HorizontalList, Photo } from '@shared/components';
import { UploadFile } from 'antd';

import { PhotosTypes } from '../model/photos.types';

export const Photos: FC<PhotosTypes> = ({
  setIsPreviewPhoto,
  loader,
  setData,
  data,
  setCurrentIndex,
}) => {
  const handleDelete = (id: string) => {
    const filteredList = data.photos.filter((file) => file.uid !== id);
    setData({ ...data, photos: filteredList });
  };

  const handleOpenModalPhoto = (index: number) => {
    setCurrentIndex(index + 1);
    setIsPreviewPhoto(true);
  };

  return (
    <HorizontalList<UploadFile>
      list={data.photos}
      loading={loader}
      itemContent={(file, index) => {
        return (
          <Photo
            onClick={() => handleOpenModalPhoto(index)}
            key={file.uid}
            onDelete={() => handleDelete(file.uid)}
            url={file.url ? file.url : URL.createObjectURL(file.originFileObj as File)}
          />
        );
      }}
    />
  );
};
