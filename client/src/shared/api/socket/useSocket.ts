import { useEffect } from 'react';
import SocketApi from './socket-api';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectorProfile } from '../../../entities';
import { updateStatus } from '../../../entities/profile/profile.slice';

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
