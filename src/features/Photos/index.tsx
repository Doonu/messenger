import React, { FC } from 'react';
import { HorizontalList, Photo } from '@shared/components';
import { UploadFile } from 'antd';

import { IPhotos } from './model/IPhotos';

export const Photos: FC<IPhotos> = ({
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
