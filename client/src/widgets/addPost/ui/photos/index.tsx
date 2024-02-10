import React, { Dispatch, FC, SetStateAction } from 'react';
import { SPhotos } from './photos.styled';
import { useFormikContext } from 'formik';
import { IPost } from '../../model/IPost';
import { IAllFiles } from '../../../../shared/models/IPost';
import { Photo } from '../../../../components/custom/photos/photo';
import { LoaderSmall } from '../../../../components/ui/loaders';

interface IPhotosProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  loader: boolean;
}

//TODO: Вынести из двух мест

const Photos: FC<IPhotosProps> = ({ data, setData, setCurrentIndex, loader }) => {
  const { values, setFieldValue } = useFormikContext<IPost>();

  const handleOpenModalPhoto = (index: number) => {
    setCurrentIndex(index + 1);
    setFieldValue('isPreviewPhoto', true);
  };

  const handleDelete = (id: string) => {
    const filteredList = data.photos.filter((file) => file.id !== id);
    setData({ ...data, photos: filteredList });
  };

  if (loader) {
    return <LoaderSmall />;
  }

  return (
    <>
      {!!data.photos.length && !loader && (
        <SPhotos $position={values.isActive}>
          {data.photos.map(({ url, id }, index) => (
            <Photo
              onClick={() => handleOpenModalPhoto(index)}
              onDelete={() => handleDelete(id)}
              url={url}
              key={id}
            />
          ))}
        </SPhotos>
      )}
    </>
  );
};

export default Photos;
