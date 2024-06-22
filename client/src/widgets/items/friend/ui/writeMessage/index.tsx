import React from 'react';
import BaseButton from 'shared/components/ui/buttons/baseButton';
import { SService } from './writeMessage.styled';

const WriteMessage = () => {
  return (
    <SService>
      <BaseButton color="primary" bgTransparent>
        Написать сообщение
      </BaseButton>
      <BaseButton bgTransparent>Позвонить</BaseButton>
    </SService>
  );
};

export default WriteMessage;
