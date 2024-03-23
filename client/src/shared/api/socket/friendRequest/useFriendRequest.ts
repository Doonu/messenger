import { useEffect } from 'react';
import SocketApi from '../socket-api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import { addNotification, showMessage } from '../../../../entities/notification/notification.slice';
import { Types } from '../../../models/INotification';
import { APINotifyItem } from '../../http/notification/getAllNotification';
import { friendRequestConverting } from './friendRequest.converting';

interface IUseFriendRequest {
  newFriendReqCallback?: (data: IResponseNotification) => void;
  acceptedRequestCallback?: () => void;
  canselFriendRequestCallback?: () => void;
  canselRequestCallback?: () => void;
}

export interface IResponseNotification {
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

  const messageView = (data: IResponseNotification, type: Types = 'success') => {
    dispatch(
      showMessage({
        title: data.message,
        type: type,
        level: 'medium',
      })
    );
  };

  const newFriendReq = (data: IResponseNotification) => {
    if (data.notification && !newFriendReqCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
    }

    if (newFriendReqCallback) {
      newFriendReqCallback(data);
    }

    messageView(data);
  };

  const handlerAcceptedRequest = (data: IResponseNotification) => {
    if (data.notification && !acceptedRequestCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
    }

    messageView(data);
    acceptedRequestCallback && acceptedRequestCallback();
  };

  const handlerCanselFriendRequest = (data: IResponseNotification) => {
    if (data.notification && !canselFriendRequestCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
    }

    messageView(data, 'error');
    canselFriendRequestCallback && canselFriendRequestCallback();
  };

  const handlerCanselRequest = (data: IResponseNotification) => {
    if (data.notification && !canselRequestCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
    }

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
