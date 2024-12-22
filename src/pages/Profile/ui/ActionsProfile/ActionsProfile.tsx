import React, { FC, useEffect, useState } from 'react';
import { MainPageProfile } from '@shared/components';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { useNavigate, useParams } from 'react-router-dom';
import { createDialog } from '@entities/dialogs';
import {
  cancellationAddFriend,
  canselFriendReq,
  deleteFriend,
  friendAccept,
  friendRequest,
  getFriendRequest,
  IGetFriendRequest,
  useFriendRequest,
} from '@entities/friends';

import { ActionsProfileTypes } from '../../model/actionsProfile.types';

const ActionsProfile: FC<ActionsProfileTypes> = ({
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
      handlerCancelFriendRequest={() => canselFriendReq({ idFriendRequest: statusUser?.reqId })}
      handlerCancelAddFriend={() => cancellationAddFriend({ idFriendRequest: statusUser?.reqId })}
      handlerDeleteFriend={handlerDeleteFriend}
      handlerCheckFriend={handlerCheckFriend}
      handlerFriendRequestAccepted={() => friendAccept({ idFriendRequest: statusUser?.reqId })}
      friendRequest={() => friendRequest({ to: profilePage.id, from: user.id })}
      statusFriendRequest={statusUser}
      user={profilePage}
      handlerWriteMessage={handlerWriteMessage}
    />
  );
};

export default ActionsProfile;
