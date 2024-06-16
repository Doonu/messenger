import React, { FC, useState } from 'react';
import { SContainer } from './chatInfo.styled';
import { IChatInfo, stageChatInfo } from './model/IChatInfo';
import MainStage from './ui/mainStage';
import AddUsersStage from './ui/addUsersStage';

const ChatInfo: FC<IChatInfo> = ({ chat }) => {
  const [stage, setStage] = useState<stageChatInfo>('main');

  const handlerSwitchStage = (stage: stageChatInfo) => setStage(stage);

  return (
    <SContainer>
      {stage === 'main' && <MainStage switchStage={handlerSwitchStage} chat={chat} />}
      {stage === 'addUsers' && <AddUsersStage switchStage={handlerSwitchStage} chat={chat} />}
    </SContainer>
  );
};

export default ChatInfo;
