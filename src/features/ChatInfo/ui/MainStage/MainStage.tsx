import React, { FC, useState } from 'react';
import { PhotoProfile, Editable } from '@shared/components';
import { GoPlusCircle } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { updateNameChat, userOutOfChat } from '@shared/api';
import { showMessage } from '@entities/notification';
import { IUser } from '@entities/friends';

import { IMainStage } from '../../model/chatInfo.types';
import ItemPlayer from './ItemPlayer/ItemPlayer';
import Navigate from './Navigate/Navigate';
import {
  AllPlayers,
  SAddPlayer,
  SBr,
  SChatInfo,
  SExit,
  SForm,
  SInfo,
  SText,
  STitle,
} from './mainStage.styles';

const MainStage: FC<IMainStage> = ({ chat, switchStage }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const [users, setUsers] = useState<IUser[]>(chat?.participants || []);

  const handlerOutChat = () => {
    if (chat?.id) {
      userOutOfChat({ dialogId: chat.id, participant: user.id });
    }
  };

  const handlerUpdateName = (value: string) => {
    if (chat?.dialogName === value) return;

    if (chat?.id && value.length <= 14 && value.length >= 4) {
      updateNameChat({ dialogId: chat.id, dialogName: value, userId: user.id });
    } else {
      dispatch(
        showMessage({
          title: 'Превышен размер названия чата',
          type: 'error',
          level: 'medium',
        })
      );
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
          <Editable onChange={(value) => handlerUpdateName(value)} value={chat?.dialogName} />
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
