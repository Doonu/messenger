import React, { FC } from 'react';
import { Modal } from '@shared/components';

import { SContainer } from './warningCountPhotos.styled';
import { WarningCountPhotosProps } from '../model/IWarningCountPhotos';

export const WarningCountPhotos: FC<WarningCountPhotosProps> = ({ message, open, onClose }) => {
  return (
    <Modal onClose={onClose} width="400px" open={open}>
      <SContainer>
        <div>Ошибка</div>
        <div>{message}</div>
      </SContainer>
    </Modal>
  );
};
