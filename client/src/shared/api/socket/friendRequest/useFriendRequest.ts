import { useEffect } from 'react';
import SocketApi from '../socket-api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import { showMessage } from '../../../../entities/notification/notification.slice';

interface IUseFriendRequest {
  newFriendReqCallback?: () => void;
  acceptedRequestCallback?: () => void;
}

export const useFriendRequest = ({
  newFriendReqCallback,
  acceptedRequestCallback,
}: IUseFriendRequest) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const messageView = (data: any) => {
    dispatch(
      showMessage({
        title: data.message,
        type: 'success',
        level: 'medium',
        onClick: () => alert('hello'),
      })
    );
  };

  const newFriendReq = (data: any) => {
    messageView(data);
    newFriendReqCallback && newFriendReqCallback();
  };

  const handlerAcceptedRequest = (data: any) => {
    messageView(data);
    acceptedRequestCallback && acceptedRequestCallback();
  };

  const connectSocket = () => {
    SocketApi.socket?.once('new_friend_req', newFriendReq);
    SocketApi.socket?.once('request_accepted', handlerAcceptedRequest);
  };

  useEffect(() => {
    if (user.id) connectSocket();

    return () => {
      SocketApi.socket?.off('new_friend_req', newFriendReq);
      SocketApi.socket?.off('request_accepted', handlerAcceptedRequest);
    };
  }, [user.id]);
};
