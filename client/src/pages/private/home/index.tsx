import React from 'react';
import BaseContainer from '../../../components/layouts/base';
import { useAppSelector } from '../../../hooks/redux';
import { selectorProfile } from '../../../entities';
import { useFriendRequest } from '../../../shared/api/socket/friendRequest/useFriendRequest';
import SocketApi from '../../../shared/api/socket/socket-api';

const Home = () => {
  const user = useAppSelector(selectorProfile);

  useFriendRequest();

  const handlerFriendRequest = () => {
    SocketApi.socket?.emit('friend_request', {
      to: 3,
      from: user.id,
    });
  };

  const handlerFriendAccept = () => {
    SocketApi.socket?.emit('accept_friend_request', {
      idFriendRequest: 3,
    });
  };

  return (
    <BaseContainer>
      <button onClick={handlerFriendRequest}>Send request</button>
      <br />
      <button onClick={handlerFriendAccept}>Accept request</button>
      <div>{user.name}</div>
    </BaseContainer>
  );
};

export default Home;
