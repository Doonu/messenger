import React, { FC } from 'react';

import ListFriends from './listFriends';
import { SContainer } from './friends.styled';
import { IFriends } from '../model/IFriends';

export const Friends: FC<IFriends> = ({ friends, title, isOnlineFriends = false }) => {
  const connectedUsers = friends.filter((friend) => friend.statusConnected);

  const notConnectedUsers = isOnlineFriends
    ? friends.filter((friend) => !friend.statusConnected)
    : friends;

  if (!friends.length) return null;

  return (
    <SContainer>
      {isOnlineFriends && !!connectedUsers.length && (
        <ListFriends
          isBorder={!!notConnectedUsers.length}
          title="Друзья онлайн"
          users={connectedUsers}
        />
      )}
      {!!friends.length && <ListFriends title={title} users={friends} />}
    </SContainer>
  );
};
