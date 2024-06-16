import React, { FC, useEffect, useState } from 'react';
import { MainPageProfile } from 'components/custom/profiles/mainPageProfile';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { IActionsProfile } from './model/IActionsProfile';
import { IGetFriendRequest } from 'shared/models/IUser';
import { friendRequestHook } from 'shared/api/socket/friendRequest/friendRequest.hook';
import { useNavigate, useParams } from 'react-router-dom';
import {
  cancellationAddFriendWS,
  deleteFriend,
  friendAcceptWS,
  friendRequestWS,
  getFriendRequest,
  canselFriendReqWS,
} from 'shared/api';
import createDialog from '../../../../../shared/api/http/dialogs/createDialog';

const ActionsProfile: FC<IActionsProfile> = ({
  profilePage,
  profileFriends,
  setProfileFriends,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector(selectorProfile);

  const idParam = params['id'];

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

  const handlerNewFriendReq = () => {
    if (idParam) {
      getStatusFriendReq(+idParam);
    }
  };

  friendRequestHook({
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
