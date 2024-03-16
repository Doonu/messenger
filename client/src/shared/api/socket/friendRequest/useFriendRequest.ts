import { useEffect } from 'react';
import SocketApi from '../socket-api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import { showMessage } from '../../../../entities/notification/notification.slice';
import { Types } from '../../../../entities/notification/model/INotification';
import { APINotifyItem } from '../../http/notification/getAllNotification';

interface IUseFriendRequest {
  newFriendReqCallback?: (data: IResponseFriendNotification) => void;
  acceptedRequestCallback?: () => void;
  canselFriendRequestCallback?: () => void;
  canselRequestCallback?: () => void;
}

export interface IResponseFriendNotification {
  message: string;
  notification: APINotifyItem;
}

export const useFriendRequest = ({
  newFriendReqCallback,
  acceptedRequestCallback,
  canselRequestCallback,
  canselFriendRequestCallback,
}: IUseFriendRequest) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const messageView = (data: IResponseFriendNotification, type: Types = 'success') => {
    dispatch(
      showMessage({
        title: data.message,
        type: type,
        level: 'medium',
      })
    );
  };

  const newFriendReq = (data: IResponseFriendNotification) => {
    messageView(data);
    console.log('hello');
    newFriendReqCallback && newFriendReqCallback(data);
  };

  const handlerAcceptedRequest = (data: any) => {
    messageView(data);
    acceptedRequestCallback && acceptedRequestCallback();
  };

  const handlerCanselFriendRequest = (data: any) => {
    messageView(data, 'error');
    canselFriendRequestCallback && canselFriendRequestCallback();
  };

  const handlerCanselRequest = (data: any) => {
    messageView(data, 'error');
    canselRequestCallback && canselRequestCallback();
  };

  const connectSocket = () => {
    SocketApi.socket?.on('new_friend_req', newFriendReq);
    SocketApi.socket?.on('request_accepted', handlerAcceptedRequest);
    SocketApi.socket?.on('friend_cancellation', handlerCanselFriendRequest);
    SocketApi.socket?.on('request_cancellation', handlerCanselRequest);
  };

  useEffect(() => {
    if (user.id) connectSocket();

    return () => {
      SocketApi.socket?.off('new_friend_req', newFriendReq);
      SocketApi.socket?.off('request_accepted', handlerAcceptedRequest);
      SocketApi.socket?.off('friend_cancellation', handlerCanselFriendRequest);
      SocketApi.socket?.off('request_cancellation', handlerCanselRequest);
    };
  }, [user.id]);
};
