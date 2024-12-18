import React, { FC } from 'react';
import { Upload as UploadAntd, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import { ProgressEvent } from 'undici';

export const Upload: FC<UploadProps> = ({ ...props }) => {
  const beforeUpload = (file: RcFile) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.addEventListener('load', (event: ProgressEvent) => {
    //   console.log(event);
    //   const _loadedImageUrl = event.target.result;
    //   const image = document.createElement('img');
    //   image.src = _loadedImageUrl;
    //   image.addEventListener('load', () => {
    //     const { width, height } = image;
    //   });
    // });
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // return isJpgOrPng;
  };
  return <UploadAntd beforeUpload={beforeUpload} {...props} />;
};
