import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import SocketApi from '../../../../shared/api/socket/socket-api';
import { IUser } from '../../../../shared/models/IUser';
import { MainPageProfile } from '../../../../components/custom/profiles/mainPageProfile';
import AllContainer from '../../../../components/layouts/all';
import { getUser } from '../../../../shared/api';
import getFriends from '../../../../shared/api/http/user/getFriends';

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const idParam = params['id'];

  const user = useAppSelector(selectorProfile);

  const [profilePage, setProfilePage] = useState<IUser>({} as IUser);
  const [profileFriends, setProfileFriends] = useState<IUser[]>([]);

  const handlerFriendRequest = () => {
    SocketApi.socket?.emit('friend_request', {
      to: profilePage.id,
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
        dispatch(getFriends(id))
          .unwrap()
          .then((data) => {
            setProfileFriends(data);
          })
          .catch(() => {});
      })
      .catch(() => {
        navigate('/');
      });
  };

  useEffect(() => {
    if (idParam) {
      handlerGetUser(+idParam);
    }
  }, [idParam]);

  return (
    <AllContainer right={false}>
      <MainPageProfile user={profilePage} />

      {profileFriends.map((el) => (
        <div key={el.id}>{el.name}</div>
      ))}
      <button onClick={handlerFriendRequest}>Send request</button>
      <br />
      <button onClick={handlerFriendAccept}>Accept request</button>
    </AllContainer>
  );
};

export default Profile;
