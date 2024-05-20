import React, { FC, useState } from 'react';
import {
  AllPlayers,
  SAddPlayer,
  SBr,
  SChatInfo,
  SExit,
  SForm,
  SInfo,
  SName,
  SText,
  STitle,
} from './mainStage.styled';
import PhotoProfile from 'components/custom/profiles/photo';
import Navigate from './navigate';
import { GoPlusCircle } from 'react-icons/go';
import ItemPlayer from './ItemPlayer';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { IUser } from 'shared/models/IUser';
import { userOutOfChat } from 'shared/api/socket/dialog';
import { IChatInfo, stageChatInfo } from '../../model/IChatInfo';

interface IMainStage extends IChatInfo {
  switchStage: (stage: stageChatInfo) => void;
}

const MainStage: FC<IMainStage> = ({ chat, switchStage }) => {
  const user = useAppSelector(selectorProfile);

  const [users, setUsers] = useState<IUser[]>(chat?.participants || []);

  const handlerOutChat = () => {
    if (chat?.id) {
      userOutOfChat({ dialogId: chat.id, participant: user.id });
    }
  };

  return (
    <>
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
          <SAddPlayer onClick={() => switchStage('addUsers')}>
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
    </>
  );
};

export default MainStage;
