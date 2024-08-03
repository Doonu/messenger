import React, { FC } from 'react';

import { SImage } from './bigPhoto.styled';
import { IBigPhoto } from '../model/IBigPhoto';

export const BigPhoto: FC<IBigPhoto> = ({ url, onClick }) => {
  return (
    <div onKeyDown={() => {}} onClick={onClick}>
      <SImage alt="Картинка поста" draggable="false" src={url} />
    </div>
  );
};
