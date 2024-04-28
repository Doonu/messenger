import React, { FC, useState } from 'react';
import { IDialog } from 'shared/models/IDialog';
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

const ChatInfo: FC<Partial<IDialog>> = (chat) => {
  const [users, setUsers] = useState<IUser[]>(chat?.participants || []);

  return (
    <SContainer>
      <STitle>Информация</STitle>
      <SChatInfo>
        {chat.imgSubstitute && chat.dialogName && (
          <PhotoProfile size={60} img={chat.imgSubstitute} name={chat.dialogName} />
        )}
        <SInfo>
          <SName>{chat.dialogName}</SName>
          <SText>{chat.participants?.length} участников</SText>
        </SInfo>
      </SChatInfo>
      <SBr />
      <div>
        <SForm>
          <Navigate setUsers={setUsers} participants={chat.participants} />
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
      <SExit>Выйти из группы</SExit>
    </SContainer>
  );
};

export default ChatInfo;
