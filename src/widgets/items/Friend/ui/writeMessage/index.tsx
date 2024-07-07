import React from 'react';
import { BaseButton } from '@shared/components';

import { SService } from './writeMessage.styled';

export const WriteMessage = () => {
  return (
    <SService>
      <BaseButton color="primary" bgTransparent>
        Написать сообщение
      </BaseButton>
      <BaseButton bgTransparent>Позвонить</BaseButton>
    </SService>
  );
};
