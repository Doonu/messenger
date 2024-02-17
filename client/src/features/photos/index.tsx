import React, { FC } from 'react';
import { IPhotos } from './model/IPhotos';
import HorizontalList from '../../components/custom/lists/HorizontalList';
import { IFilesPost } from '../../shared/models/IPost';
import { Photo } from '../../components/custom/photos/photo';

const Photos: FC<IPhotos> = ({ setIsPreviewPhoto, loader, setData, data, setCurrentIndex }) => {
  const handleDelete = (id: string) => {
    const filteredList = data.photos.filter((file) => file.id !== id);
    setData({ ...data, photos: filteredList });
  };

  const handleOpenModalPhoto = (index: number) => {
    setCurrentIndex(index + 1);
    setIsPreviewPhoto(true);
  };

  return (
    <>
      <HorizontalList<IFilesPost, IFilesPost>
        list={data.photos}
        loading={loader}
        itemContent={(file, index) => (
          <Photo
            onClick={() => handleOpenModalPhoto(index)}
            key={file.id}
            onDelete={() => handleDelete(file.id)}
            url={file.url}
          />
        )}
      />
    </>
  );
};

export default Photos;
