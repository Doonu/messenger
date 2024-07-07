import React, { FC, useEffect, useState } from 'react';
import { MainPageProfile } from '@shared/components';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { IGetFriendRequest } from '@shared/models';
import {
  createDialog,
  useFriendRequestHook,
  cancellationAddFriendWS,
  deleteFriend,
  friendAcceptWS,
  friendRequestWS,
  getFriendRequest,
  canselFriendReqWS,
} from '@shared/api';
import { useNavigate, useParams } from 'react-router-dom';

import { IActionsProfile } from './model/IActionsProfile';

const ActionsProfile: FC<IActionsProfile> = ({
  profilePage,
  profileFriends,
  setProfileFriends,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector(selectorProfile);

  const idParam = params.id;

  const [statusUser, setStatusUser] = useState<IGetFriendRequest>({ status: false });

  const handlerCheckFriend = () => !!profileFriends.find((friend) => user.id === friend.id);

  const getStatusFriendReq = (id: number) => {
    dispatch(getFriendRequest(id))
      .unwrap()
      .then((data) => {
        setStatusUser(data);
      })
      .catch(() => {});
  };

  const handlerWriteMessage = () => {
    dispatch(createDialog({ participantIds: [profilePage.id] }))
      .unwrap()
      .then(({ id }) => navigate(`/dialog/${id}`));
  };

  const handlerDeleteFriend = () => {
    dispatch(deleteFriend(profilePage.id))
      .unwrap()
      .then(() => {
        setProfileFriends((prev) =>
          prev.filter((itemProfilePage) => itemProfilePage.id !== user.id)
        );
      })
      .catch(() => {});
  };

  const handlerAddFriend = () => {
    setProfileFriends((prev) => [...prev, user]);

    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  };

  const baseHandler = () => {
    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  };

  const handlerNewFriendReq = () => {
    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  };

  useFriendRequestHook({
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
      handlerCancelFriendRequest={() => canselFriendReqWS({ idFriendRequest: statusUser?.reqId })}
      handlerCancelAddFriend={() => cancellationAddFriendWS({ idFriendRequest: statusUser?.reqId })}
      handlerDeleteFriend={handlerDeleteFriend}
      handlerCheckFriend={handlerCheckFriend}
      handlerFriendRequestAccepted={() => friendAcceptWS({ idFriendRequest: statusUser?.reqId })}
      friendRequest={() => friendRequestWS({ to: profilePage.id, from: user.id })}
      statusFriendRequest={statusUser}
      user={profilePage}
      handlerWriteMessage={handlerWriteMessage}
    />
  );
};

export default ActionsProfile;
