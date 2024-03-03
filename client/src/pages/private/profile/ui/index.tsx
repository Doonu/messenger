import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/redux';
import { IUser } from '../../../../shared/models/IUser';
import AllContainer from '../../../../components/layouts/all';
import { getUser } from '../../../../shared/api';
import getFriends from '../../../../shared/api/http/user/getFriends';
import ActionsProfile from './actionsProfile';

//TODO: Сделать удаление друга
//TODO: Сделать отмену добавления в друзья
//TODO: Отказ добавления в друзья

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [profilePage, setProfilePage] = useState<IUser>({} as IUser);
  const [profileFriends, setProfileFriends] = useState<IUser[]>([]);

  const idParam = params['id'];

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
      <ActionsProfile
        setProfileFriends={setProfileFriends}
        profileFriends={profileFriends}
        profilePage={profilePage}
      />

      {profileFriends.map((el) => (
        <div key={el.id}>{el.name}</div>
      ))}
    </AllContainer>
  );
};

export default Profile;
