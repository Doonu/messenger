import React, { Dispatch, FC, SetStateAction } from 'react';
import { IAllFiles } from '../../../../shared/models/IPost';
import { Photo } from '../../../../components/ui/photos/photo';
import { SContainer } from './photos.styled';

interface IPhotosProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setIsCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPreviewPhoto: Dispatch<SetStateAction<boolean>>;
}

//TODO: Вынести из двух мест

const Photos: FC<IPhotosProps> = ({ data, setData, setIsCurrentIndex, setIsPreviewPhoto }) => {
  const handleDelete = (id: string) => {
    const filteredList = data.photos.filter((file) => file.id !== id);
    setData({ ...data, photos: filteredList });
  };

  const handleOpenModalPhoto = (index: number) => {
    setIsCurrentIndex(index + 1);
    setIsPreviewPhoto(true);
  };

  return (
    <SContainer>
      {data.photos.map((file, index) => (
        <Photo
          onClick={() => handleOpenModalPhoto(index)}
          key={file.id}
          onDelete={() => handleDelete(file.id)}
          url={file.url}
        />
      ))}
    </SContainer>
  );
};

export default Photos;
