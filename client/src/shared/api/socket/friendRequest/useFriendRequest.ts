import { useEffect } from 'react';
import SocketApi from '../socket-api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import { showMessage } from '../../../../entities/notification/notification.slice';

export const useFriendRequest = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const messageView = (data: any) => {
    dispatch(
      showMessage({
        title: data.message,
        type: 'success',
        level: 'low',
      })
    );
  };

  const connectSocket = () => {
    SocketApi.createConnection(user.id);

    SocketApi.socket?.once('new_friend_req', messageView);

    SocketApi.socket?.once('request_accepted', messageView);

    SocketApi.socket?.once('request_sent', messageView);
  };

  useEffect(() => {
    if (user.id) connectSocket();

    return () => {
      SocketApi.socket?.off('new_friend_req', messageView);
      SocketApi.socket?.off('connect');
    };
  }, [user.id]);
};
