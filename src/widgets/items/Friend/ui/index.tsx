import React, { FC, useState } from 'react';
import { PhotoProfile } from '@shared/components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { friendRequestWS } from '@shared/api';

import { IFriend } from '../model/IFriend';
import { WriteMessage } from './writeMessage';
import { AddFriend } from './addFriend';
import { SContainer, SInfo, SName, SServices } from './friend.styled';

export const Friend: FC<IFriend> = ({ user, type, isBorderFirst = true }) => {
  const profile = useAppSelector(selectorProfile);

  const [viewAddFriendService, setViewAddFriendService] = useState(false);

  const navigate = useNavigate();

  const handlerFriendRequestWS = () => {
    friendRequestWS({ to: user.id, from: profile.id });
    setViewAddFriendService(true);
  };

  return (
    <SContainer $isBorderFirst={isBorderFirst}>
      <PhotoProfile status={user.statusConnected} size={60} img={user.avatar} name={user.name} />
      <SServices>
        <SInfo>
          <SName onClick={() => navigate(`/profile/${user.id}`)}>
            {user.name} <span>({user.friends.length} друзей)</span>
          </SName>
          {type === 'friend' && <WriteMessage />}
        </SInfo>
        {type === 'notFriend' && (
          <AddFriend
            isSendFriend={user.isSendFriend}
            viewAddFriendService={viewAddFriendService}
            addFriendHandler={handlerFriendRequestWS}
          />
        )}
      </SServices>
    </SContainer>
  );
};
