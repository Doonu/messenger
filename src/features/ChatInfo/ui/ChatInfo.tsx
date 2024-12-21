import React, { FC, useState } from 'react';

import { SContainer } from './chatInfo.styles';
import { ChatInfoTypes, StageChatInfo } from '../model/chatInfo.types';
import MainStage from './MainStage/MainStage';
import AddUsersStage from './AddUsersStage/AddUsersStage';

// TODO: Вынести на уровень page
export const ChatInfo: FC<ChatInfoTypes> = ({ chat }) => {
  const [stage, setStage] = useState<StageChatInfo>('main');

  const handlerSwitchStage = (currentStage: StageChatInfo) => setStage(currentStage);

  return (
    <SContainer>
      {stage === 'main' && <MainStage switchStage={handlerSwitchStage} chat={chat} />}
      {stage === 'addUsers' && <AddUsersStage switchStage={handlerSwitchStage} chat={chat} />}
    </SContainer>
  );
};
