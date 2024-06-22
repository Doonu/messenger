import React, { FC } from 'react';
import Back from 'shared/components/custom/back';
import { stageChatInfo } from '../../../model/IChatInfo';
import { SContainer, STitle } from './navigate.styles';

interface INavigate {
  switchStage: (stage: stageChatInfo) => void;
}

const Navigate: FC<INavigate> = ({ switchStage }) => {
  return (
    <SContainer>
      <Back handlerClick={() => switchStage('main')} />
      <STitle>Добавить участников</STitle>
      <div style={{ width: '35px' }}></div>
    </SContainer>
  );
};

export default Navigate;
