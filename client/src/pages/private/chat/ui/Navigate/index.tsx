import React, { FC, useMemo } from 'react';
import {
  SBack,
  SCansel,
  SCenter,
  SContainer,
  SFutures,
  SIcons,
  SIconsTop,
  SInfo,
  SProfile,
} from './navigate.styled';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoProfile from 'components/custom/profiles/photo';
import { generateChatInfo } from 'shared/util/generateChat';
import { postTime } from 'shared/util/time';
import { IoClose } from 'react-icons/io5';
import { BsPinAngleFill } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import BaseButton from 'components/ui/buttons/baseButton';
import { IChat } from '../../model/IChat';
import { compositionRevert } from '../../lib/compositMessages';
import { deleteMessage } from 'shared/api/socket/dialog';
import { IDialog } from 'shared/models/IDialog';
import { createFixedMessage } from 'shared/api';

interface INavigate {
  choiceMessages: number[];
  onCansel: () => void;
  allMessages: IChat[];
  chat?: IDialog;
}

const Navigate: FC<INavigate> = ({ choiceMessages, onCansel, allMessages, chat }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const idParam = params['id'];

  const user = useAppSelector(selectorProfile);

  const filteredParticipants = chat?.participants?.filter((el) => el.id !== user.id);

  const generateInfoChat = generateChatInfo({
    users: filteredParticipants,
    dialogName: chat?.dialogName,
    imgSubstitute: chat?.imgSubstitute,
    type: chat?.isGroup,
  });

  const isInfoChat = filteredParticipants?.[0].statusConnected
    ? 'Онлайн'
    : filteredParticipants?.[0].timeConnected &&
      `был в сети ${postTime(filteredParticipants[0].timeConnected)}`;

  const infoChat = !chat?.isGroup ? isInfoChat : `${chat?.participants?.length} участника`;

  const checkDelete = useMemo(() => {
    const initialMessages = compositionRevert(allMessages);
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
    idParam && dispatch(createFixedMessage({ dialogId: +idParam, messageId: choiceMessages[0] }));
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
                <div onClick={handlerFixMessage}>
                  <BsPinAngleFill size={20} />
                </div>
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
          <SBack onClick={() => navigate(-1)}>
            <IoIosArrowBack size={25} />
            Назад
          </SBack>
          <SCenter>
            <SProfile>{generateInfoChat.nameDialog}</SProfile>
            <SInfo>{infoChat}</SInfo>
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
