import React, { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { useParams } from 'react-router-dom';
import { PhotoProfile, BaseButton, Back } from '@shared/components';
import { generateChatInfo, postTime } from '@shared/util';
import { IoClose } from 'react-icons/io5';
import { BsPinAngleFill } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteMessage, createFixedMessage } from '@shared/api';
import { IChat, IDialogChat } from '@shared/models';

import {
  SContainer,
  SFutures,
  SIcons,
  SIconsTop,
  SInfo,
  SProfile,
  SCenter,
  SCansel,
} from './navigate.styled';
import { compositionRevert } from '../../lib/compositMessages';

interface INavigate {
  choiceMessages: number[];
  onCansel: () => void;
  allMessages: IChat[];
  newMessages: IChat[];
  setInfoPlayers: Dispatch<SetStateAction<boolean>>;
  chat?: IDialogChat | null;
}

const Navigate: FC<INavigate> = ({
  choiceMessages,
  onCansel,
  allMessages,
  chat,
  setInfoPlayers,
  newMessages,
}) => {
  const params = useParams();
  const idParam = params.id;

  const user = useAppSelector(selectorProfile);

  const filteredParticipants = chat?.participants?.filter((el) => el.id !== user.id);

  const generateInfoChat = generateChatInfo({
    users: filteredParticipants,
    dialogName: chat?.dialogName,
    imgSubstitute: chat?.imgSubstitute,
    type: chat?.isGroup,
  });

  const isInfoChat = filteredParticipants?.[0]?.statusConnected
    ? 'Онлайн'
    : filteredParticipants?.[0]?.timeConnected &&
      `был в сети ${postTime(filteredParticipants[0]?.timeConnected)}`;

  const checkDelete = useMemo(() => {
    const initialMessages = [...compositionRevert(allMessages), ...compositionRevert(newMessages)];
    const findMessages = initialMessages
      .filter((el) => choiceMessages.includes(el.id))
      .filter((el) => el.userId === user.id);

    return findMessages.length === choiceMessages.length;
  }, [choiceMessages.length]);

  const handlerDelete = () => {
    deleteMessage({
      userId: user.id,
      dialogId: chat?.id,
      messagesId: choiceMessages,
    });
  };

  const handlerFixMessage = () => {
    if (idParam) {
      createFixedMessage({
        messageId: choiceMessages[0],
        dialogId: +idParam,
        userId: user.id,
      });
    }
  };

  return (
    <SContainer>
      {!!choiceMessages.length && (
        <>
          <SCansel onClick={onCansel}>
            {choiceMessages.length} сообщение <IoClose />
          </SCansel>
          <SFutures>
            <SIconsTop>
              {choiceMessages.length === 1 && (
                <SIcons onClick={handlerFixMessage}>
                  <BsPinAngleFill size={20} />
                </SIcons>
              )}
              <FaRegStar size={20} />
              {checkDelete && <AiOutlineDelete onClick={handlerDelete} size={20} />}
            </SIconsTop>
            <BaseButton variant="secondary">Ответить</BaseButton>
            <BaseButton variant="secondary">Переслать</BaseButton>
          </SFutures>
        </>
      )}
      {!choiceMessages.length && (
        <>
          <Back />
          <SCenter>
            <SProfile>{generateInfoChat.nameDialog}</SProfile>
            {!chat?.isGroup && <SInfo>{isInfoChat}</SInfo>}
            {chat?.isGroup && (
              <SInfo onClick={() => setInfoPlayers(true)}>
                {chat?.participants?.length} участника
              </SInfo>
            )}
          </SCenter>
          <SIcons>
            {generateInfoChat.imgDialog && generateInfoChat.nameDialog && (
              <PhotoProfile
                img={generateInfoChat.imgDialog}
                name={generateInfoChat.nameDialog}
                status={generateInfoChat.statusDialog}
              />
            )}
          </SIcons>
        </>
      )}
    </SContainer>
  );
};

export default Navigate;
