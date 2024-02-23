import { useEffect } from 'react';
import SocketApi from '../socket-api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import { showMessage } from '../../../../entities/notification/notification.slice';

export const useFriendRequest = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const connectSocket = () => {
    SocketApi.createConnection(user.id);

    SocketApi.socket?.on('new_friend_req', (data) => {
      console.log('Создание friend req', data);
      dispatch(
        showMessage({
          title: 'Вам пришло предложение дружбы',
          type: 'success',
          level: 'low',
        })
      );
    });

    SocketApi.socket?.on('request_accepted', (data) => {
      console.log('Request принят', data);
    });

    SocketApi.socket?.on('request_sent', (data) => {
      console.log('Request отправлен', data);
    });
  };

  useEffect(() => {
    if (user.id) connectSocket();

    // return () => {
    //   if (user.id) {
    //     SocketApi.socket?.off('new_friend_req');
    //     SocketApi.socket?.off('request_accepted');
    //     SocketApi.socket?.off('request_sent');
    //   }
    // };
  }, [user.id]);
};
