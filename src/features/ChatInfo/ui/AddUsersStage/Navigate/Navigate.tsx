import React, { FC } from 'react';
import { Back } from '@shared/components';

import { IMainStage } from '../../../model/chatInfo.types';
import { SContainer, STitle } from './navigate.styles';

const Navigate: FC<Pick<IMainStage, 'switchStage'>> = ({ switchStage }) => {
  return (
    <SContainer>
      <Back handlerClick={() => switchStage('main')} />
      <STitle>Добавить участников</STitle>
      <div style={{ width: '35px' }} />
    </SContainer>
  );
};

export default Navigate;
