import React, { FC, useMemo } from 'react';
import { IDialog } from 'shared/models/IDialog';
import PhotoProfile from 'components/custom/profiles/photo';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import {
  SBadge,
  SBottom,
  SContainer,
  SInfo,
  SLastMessage,
  SMessage,
  STime,
  STitle,
  STop,
} from './dialog.styled';
import { postTime } from 'shared/util/time';
import { useNavigate } from 'react-router-dom';
import { generateChatInfo } from 'shared/util/generateChat';

const Dialog: FC<IDialog> = ({
  id,
  participants,
  imgSubstitute,
  dialogName,
  updatedAt,
  isGroup,
  countNotReadMessages,
  readStatusLastMessage,
  lastMessage,
}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorProfile);

  const filteredUsers = useMemo(() => participants.filter((player) => player.id !== user.id), []);

  const generateInfoChat = generateChatInfo({
    type: isGroup,
    imgSubstitute: imgSubstitute,
    dialogName: dialogName,
    users: filteredUsers,
  });
  const message = lastMessage?.content.join('');

  const handlerDialog = () => navigate(`/dialog/${id}`);

  const isPhotoSecondary = lastMessage?.author;

  return (
    <SContainer $isRead={readStatusLastMessage} onClick={handlerDialog}>
      {generateInfoChat.nameDialog && generateInfoChat.imgDialog && (
        <PhotoProfile
          status={generateInfoChat.statusDialog}
          size={60}
          img={generateInfoChat.imgDialog}
          name={generateInfoChat.nameDialog}
        />
      )}
      <SInfo>
        <STop>
          <STitle>{generateInfoChat.nameDialog}</STitle>
          <STime>{postTime(updatedAt)}</STime>
        </STop>
        <SBottom>
          <SLastMessage>
            {isPhotoSecondary && lastMessage?.author && (
              <PhotoProfile
                size={25}
                fontSize={12}
                name={lastMessage?.author.name}
                img={lastMessage?.author.avatar}
              />
            )}
            <SMessage>{message}</SMessage>
          </SLastMessage>
          <SBadge count={countNotReadMessages} />
        </SBottom>
      </SInfo>
    </SContainer>
  );
};

export default Dialog;
