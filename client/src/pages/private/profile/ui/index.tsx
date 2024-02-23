import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import { useFriendRequest } from '../../../../shared/api/socket/friendRequest/useFriendRequest';
import SocketApi from '../../../../shared/api/socket/socket-api';
import { IUser } from '../../../../shared/models/IUser';
import { MainPageProfile } from '../../../../components/custom/profiles/mainPageProfile';
import AllContainer from '../../../../components/layouts/all';
import { getUser } from '../../../../shared/api';

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const idParam = params['id'];

  const user = useAppSelector(selectorProfile);

  const [profilePage, setProfilePage] = useState<IUser>({} as IUser);

  useFriendRequest();

  const handlerFriendRequest = () => {
    SocketApi.socket?.emit('friend_request', {
      to: 5,
      from: user.id,
    });
  };

  const handlerFriendAccept = () => {
    SocketApi.socket?.emit('accept_friend_request', {
      idFriendRequest: 2,
    });
  };

  const handlerGetUser = (id: number) => {
    dispatch(getUser(id))
      .unwrap()
      .then((data) => {
        setProfilePage(data);
      })
      .catch(() => {
        navigate('/');
      });
  };

  useEffect(() => {
    if (idParam && user.id !== +idParam) {
      handlerGetUser(+idParam);
    } else {
      setProfilePage(user);
    }
  }, [idParam]);

  return (
    <AllContainer right={false}>
      <MainPageProfile user={profilePage} />
      <button onClick={handlerFriendRequest}>Send request</button>
      <br />
      <button onClick={handlerFriendAccept}>Accept request</button>
    </AllContainer>
  );
};

export default Profile;
