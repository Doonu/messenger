import React, { FC, useEffect, useState } from 'react';
import { MainPageProfile } from '../../../../../components/custom/profiles/mainPageProfile';
import SocketApi from '../../../../../shared/api/socket/socket-api';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { selectorProfile } from '../../../../../entities';
import { IActionsProfile } from './model/IActionsProfile';
import getFriendRequest, {
  IGetFriendRequest,
} from '../../../../../shared/api/http/user/getFriendRequest';
import { useFriendRequest } from '../../../../../shared/api/socket/friendRequest/useFriendRequest';
import { useParams } from 'react-router-dom';

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

  const handlerFriendRequest = () => {
    SocketApi.socket?.emit('friend_request', {
      to: profilePage.id,
      from: user.id,
    });
  };

  const handlerFriendAccept = () => {
    SocketApi.socket?.emit('accept_friend_request', {
      idFriendRequest: statusUser?.reqId,
    });
  };

  const handlerCheckFriend = () => !!profileFriends.find((friend) => user.id === friend.id);

  const getStatusFriendReq = (id: number) => {
    dispatch(getFriendRequest(id))
      .unwrap()
      .then((data) => {
        setStatusUser(data);
      });
  };

  const handlerAddFriend = () => {
    setProfileFriends((prev) => [...prev, user]);
    idParam && getStatusFriendReq(+idParam);
  };

  useFriendRequest({
    newFriendReqCallback: () => idParam && getStatusFriendReq(+idParam),
    acceptedRequestCallback: handlerAddFriend,
  });

  useEffect(() => {
    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  }, []);

  return (
    <MainPageProfile
      handlerCheckFriend={handlerCheckFriend}
      handlerFriendRequestAccepted={handlerFriendAccept}
      friendRequest={handlerFriendRequest}
      statusFriendRequest={statusUser}
      user={profilePage}
    />
  );
};

export default ActionsProfile;
