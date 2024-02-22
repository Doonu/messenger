import { useEffect } from 'react';
import SocketApi from '../socket-api';
import { useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';

export const useFriendRequest = () => {
  const user = useAppSelector(selectorProfile);

  const connectSocket = () => {
    SocketApi.createConnection(user.id);

    SocketApi.socket?.on('new_friend_req', (data) => {
      console.log('Создание friend req');
    });

    SocketApi.socket?.on('request_accepted', (data) => {
      console.log('Request принят');
    });

    SocketApi.socket?.on('request_sent', (data) => {
      console.log('Request отправлен');
    });
  };

  useEffect(() => {
    if (user.id) connectSocket();
  }, [user.id]);
};
