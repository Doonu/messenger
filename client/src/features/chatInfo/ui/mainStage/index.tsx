import React, { FC, useState } from 'react';
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
} from './mainStage.styled';
import PhotoProfile from 'shared/components/custom/profiles/photo';
import Navigate from './navigate';
import { GoPlusCircle } from 'react-icons/go';
import ItemPlayer from './ItemPlayer';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { IUser } from 'shared/models/IUser';
import { updateNameChat, userOutOfChat } from 'shared/api/socket/dialog';
import { IChatInfo, stageChatInfo } from '../../model/IChatInfo';
import { showMessage } from 'entities/notification/notification.slice';
import Editable from 'shared/components/custom/editable';

interface IMainStage extends IChatInfo {
  switchStage: (stage: stageChatInfo) => void;
}

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
