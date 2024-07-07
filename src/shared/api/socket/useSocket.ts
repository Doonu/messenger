import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorProfile, updateStatus } from '@entities/profile';

import { SocketApi } from './socket-api';

export const useSocket = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const connectSocket = () => {
    SocketApi.createConnection(user.id);
    dispatch(updateStatus());
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
