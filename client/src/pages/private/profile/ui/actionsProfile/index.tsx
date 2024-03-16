import React, { FC, useEffect, useState } from 'react';
import { MainPageProfile } from '../../../../../components/custom/profiles/mainPageProfile';
import SocketApi from '../../../../../shared/api/socket/socket-api';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { selectorProfile } from '../../../../../entities';
import { IActionsProfile } from './model/IActionsProfile';
import getFriendRequest, {
  IGetFriendRequest,
} from '../../../../../shared/api/http/user/getFriendRequest';
import {
  IResponseFriendNotification,
  useFriendRequest,
} from '../../../../../shared/api/socket/friendRequest/useFriendRequest';
import { useParams } from 'react-router-dom';
import deleteFriend from '../../../../../shared/api/http/user/deleteFriend';
import { addNotification } from '../../../../../entities/notification/notification.slice';
import { friendRequestConverting } from '../../../../../shared/api/socket/friendRequest/friendRequest.converting';

const ActionsProfile: FC<IActionsProfile> = ({
  profilePage,
  profileFriends,
  setProfileFriends,
}) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector(selectorProfile);

  const idParam = params['id'];

  const [statusUser, setStatusUser] = useState<IGetFriendRequest>({ status: false });

  const handlerFriendRequestWS = () => {
    SocketApi.socket?.emit('friend_request', {
      to: profilePage.id,
      from: user.id,
    });
  };

  const handlerFriendAcceptWS = () => {
    SocketApi.socket?.emit('accept_friend_request', {
      idFriendRequest: statusUser?.reqId,
    });
  };

  const handlerCancellationAddFriendWS = () => {
    SocketApi.socket?.emit('cancellation_add_friend', {
      idFriendRequest: statusUser?.reqId,
    });
  };

  const canselFriendReqWS = () => {
    SocketApi.socket?.emit('cancellation_friend_request', {
      idFriendRequest: statusUser?.reqId,
    });
  };

  const handlerCheckFriend = () => !!profileFriends.find((friend) => user.id === friend.id);

  const getStatusFriendReq = (id: number) => {
    dispatch(getFriendRequest(id))
      .unwrap()
      .then((data) => {
        setStatusUser(data);
      })
      .catch(() => {});
  };

  const handlerDeleteFriend = () => {
    dispatch(deleteFriend(profilePage.id))
      .unwrap()
      .then(() => {
        setProfileFriends((prev) => prev.filter((profilePage) => profilePage.id !== user.id));
      })
      .catch(() => {});
  };

  const handlerAddFriend = () => {
    setProfileFriends((prev) => [...prev, user]);
    idParam && getStatusFriendReq(+idParam);
  };

  const baseHandler = () => {
    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  };

  const handlerNewFriendReq = (data: IResponseFriendNotification) => {
    if (data.notification) {
      const notification = friendRequestConverting(data.notification);
      dispatch(addNotification(notification));
    }

    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  };

  useFriendRequest({
    newFriendReqCallback: handlerNewFriendReq,
    acceptedRequestCallback: handlerAddFriend,
    canselFriendRequestCallback: baseHandler,
    canselRequestCallback: baseHandler,
  });

  useEffect(() => {
    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  }, []);

  return (
    <MainPageProfile
      handlerCancelFriendRequest={canselFriendReqWS}
      handlerCancelAddFriend={handlerCancellationAddFriendWS}
      handlerDeleteFriend={handlerDeleteFriend}
      handlerCheckFriend={handlerCheckFriend}
      handlerFriendRequestAccepted={handlerFriendAcceptWS}
      friendRequest={handlerFriendRequestWS}
      statusFriendRequest={statusUser}
      user={profilePage}
    />
  );
};

export default ActionsProfile;
