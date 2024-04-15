import React, { FC, useState } from 'react';
import { SContainer, SInfo, SName, SServices } from './friend.styled';
import PhotoProfile from 'components/custom/profiles/photo';
import { useNavigate } from 'react-router-dom';
import { IFriend } from '../model/IFriend';
import WriteMessage from './writeMessage';
import AddFriend from './addFriend';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { friendRequestWS } from 'shared/api';

const Friend: FC<IFriend> = ({ user, type, isBorderFirst = true }) => {
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

export default Friend;
