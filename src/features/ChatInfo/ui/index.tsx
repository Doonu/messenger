import React, { FC, useState } from 'react';

import { SContainer } from './chatInfo.styled';
import { IChatInfo, StageChatInfo } from '../model/IChatInfo';
import MainStage from './MainStage';
import AddUsersStage from './AddUsersStage';

// TODO: Вынести на уровень page
export const ChatInfo: FC<IChatInfo> = ({ chat }) => {
  const [stage, setStage] = useState<StageChatInfo>('main');

  const handlerSwitchStage = (currentStage: StageChatInfo) => setStage(currentStage);

  return (
    <SContainer>
      {stage === 'main' && <MainStage switchStage={handlerSwitchStage} chat={chat} />}
      {stage === 'addUsers' && <AddUsersStage switchStage={handlerSwitchStage} chat={chat} />}
    </SContainer>
  );
};
