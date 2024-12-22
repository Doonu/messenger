import React, { FC } from 'react';
import { Camera, Music, Poster, SFile, Video } from '@shared/assets';
import { Upload } from '@shared/ui';
import { UploadChangeParam } from 'antd/es/upload';

import { SContainer, SDivider } from './actionFiles.styles';
import { IActionFilesProps } from '../model/actionFiles.types';

export const ActionFiles: FC<IActionFilesProps> = ({
  setData,
  data,
  onActive,
  onTitle,
  isActive = true,
}) => {
  const handlerFile = async ({ fileList, file }: UploadChangeParam) => {
    if (data.files.length + fileList.length > 10) {
      onTitle('Вы можете прикрепить к посту не больше 10 файлов');
      return;
    }

    setData((prev) => ({ ...prev, files: [file, ...prev.files] }));

    if (onActive) {
      onActive();
    }
  };

  const handlerPhoto = async ({ fileList, file }: UploadChangeParam) => {
    if (data.photos.length + fileList.length > 5) {
      onTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    setData((prev) => ({ ...prev, photos: [file, ...prev.photos] }));

    if (onActive) {
      onActive();
    }
  };

  return (
    <SContainer>
      {isActive && (
        <>
          <div>
            <Poster />
          </div>
          <SDivider />
        </>
      )}
      <Upload customRequest={() => {}} multiple onChange={handlerPhoto} showUploadList={false}>
        <Camera title="Фото" />
      </Upload>
      <div>
        <Video />
      </div>
      <div>
        <Music />
      </div>
      <Upload showUploadList={false} multiple onChange={handlerFile} customRequest={() => {}}>
        <SFile title="Файл" />
      </Upload>
    </SContainer>
  );
};
