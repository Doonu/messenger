import React, { FC } from 'react';

import { SContainer } from './warningCountPhotos.styled';
import { WarningCountPhotosProps } from '../model/IWarningCountPhotos';

export const WarningCountPhotos: FC<WarningCountPhotosProps> = ({ message }) => {
  return (
    <SContainer>
      <div>Ошибка</div>
      <div>{message}</div>
    </SContainer>
  );
};
