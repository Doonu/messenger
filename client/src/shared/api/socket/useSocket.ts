import { useEffect } from 'react';
import SocketApi from './socket-api';
import { useAppSelector } from '../../../hooks/redux';
import { selectorProfile } from '../../../entities';

export const useSocket = () => {
  const user = useAppSelector(selectorProfile);

  const connectSocket = () => {
    SocketApi.createConnection(user.id);
  };

  useEffect(() => {
    if (user.id) connectSocket();

    return () => {
      SocketApi.socket?.off('connect');
      SocketApi.socket?.off('disconnect');
      SocketApi.socket?.disconnect();
    };
  }, [user.id]);
};
