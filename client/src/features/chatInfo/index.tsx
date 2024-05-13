import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { IDialogChat } from 'shared/models/IDialog';
import {
  AllPlayers,
  SAddPlayer,
  SBr,
  SChatInfo,
  SContainer,
  SExit,
  SForm,
  SInfo,
  SName,
  SText,
  STitle,
} from './chatInfo.styled';
import PhotoProfile from 'components/custom/profiles/photo';
import { GoPlusCircle } from 'react-icons/go';
import ItemPlayer from './ui/ItemPlayer';
import Navigate from './ui/Navigate';
import { IUser } from '../../shared/models/IUser';
import { userOutOfChat } from 'shared/api/socket/dialog/index';
import { useAppSelector } from '../../hooks/redux';
import { selectorProfile } from '../../entities/profile/profile.selectors';

interface IChatInfo {
  chat: Partial<IDialogChat | null>;
  setChat: Dispatch<SetStateAction<IDialogChat | null>>;
}

const ChatInfo: FC<IChatInfo> = ({ chat }) => {
  const user = useAppSelector(selectorProfile);

  const [users, setUsers] = useState<IUser[]>(chat?.participants || []);

  const handlerOutChat = () => {
    if (chat?.id) {
      userOutOfChat({ dialogId: chat.id, participant: user.id });
    }
  };

  return (
    <SContainer>
      <STitle>Информация</STitle>
      <SChatInfo>
        {chat?.imgSubstitute && chat.dialogName && (
          <PhotoProfile size={60} img={chat.imgSubstitute} name={chat.dialogName} />
        )}
        <SInfo>
          <SName>{chat?.dialogName}</SName>
          <SText>{chat?.participants?.length} участников</SText>
        </SInfo>
      </SChatInfo>
      <SBr />
      <div>
        <SForm>
          <Navigate setUsers={setUsers} participants={chat?.participants} />
          <SAddPlayer>
            <GoPlusCircle size={40} />
            <div>Добавить участников</div>
          </SAddPlayer>
          <AllPlayers>
            {users?.map((player) => (
              <ItemPlayer key={player.id} {...player} />
            ))}
          </AllPlayers>
        </SForm>
      </div>
      <SExit onClick={handlerOutChat}>Выйти из группы</SExit>
    </SContainer>
  );
};

export default ChatInfo;
