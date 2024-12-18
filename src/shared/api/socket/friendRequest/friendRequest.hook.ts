import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { addCount, addNotification, showMessage } from '@entities/notification';
import { Types } from '@shared/models';
import {
  SocketApi,
  friendRequestConverting,
  IResponseNotification,
  IUseFriendRequest,
} from '@shared/api';

export const useFriendRequestHook = ({
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
        type,
        level: 'medium',
      })
    );
  };

  const newFriendReq = (data: IResponseNotification) => {
    if (data.notification && !newFriendReqCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
      dispatch(addCount());
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
      dispatch(addCount());
    }

    messageView(data);

    if (acceptedRequestCallback) {
      acceptedRequestCallback();
    }
  };

  const handlerCanselFriendRequest = (data: IResponseNotification) => {
    if (data.notification && !canselFriendRequestCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
      dispatch(addCount());
    }

    messageView(data, 'error');

    if (canselFriendRequestCallback) {
      canselFriendRequestCallback();
    }
  };

  const handlerCanselRequest = (data: IResponseNotification) => {
    if (data.notification && !canselRequestCallback) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
      dispatch(addCount());
    }

    messageView(data, 'error');

    if (canselRequestCallback) {
      canselRequestCallback();
    }
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
