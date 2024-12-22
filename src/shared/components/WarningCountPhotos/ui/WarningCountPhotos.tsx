import React, { FC } from 'react';
import { Modal } from '@shared/ui';

import { SContainer } from './warningCountPhotos.styles';
import { WarningCountPhotosProps } from '../model/warningCountPhotos.types';

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
