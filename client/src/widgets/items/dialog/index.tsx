import React, { FC, useMemo } from 'react';
import { IDialog } from 'shared/models/IDialog';
import PhotoProfile from 'components/custom/profiles/photo';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { SBottom, SContainer, SInfo, STime, STitle, STop } from './dialog.styled';
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

  const handlerDialog = () => navigate(`/dialog/${id}`);

  return (
    <SContainer onClick={handlerDialog}>
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
        <SBottom>Последнее сообщение беседы</SBottom>
      </SInfo>
    </SContainer>
  );
};

export default Dialog;
