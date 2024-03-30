import React, { useEffect, useState } from 'react';
import AllContainer from 'components/layouts/all';
import ApplicationsFriends from './applicationsFriends';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import getFriends from 'shared/api/http/user/getFriends';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { selectorSearch } from 'entities/friends/friends.selectors';
import { setAllFriends } from 'entities/friends/friends.slice';
import { getUsersExceptFriends } from 'shared/api';
import Friends from './friends';
import AllUsers from './allUsers';
import { IUserExcept } from 'shared/models/IUser';

const Users = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);

  const search = useAppSelector(selectorSearch);

  const [allUsers, setAllUsers] = useState<IUserExcept[]>([]);

  const handlerGetFriends = () => {
    dispatch(getFriends({ id: user.id, page: 1, search }));
  };

  const handlerGetUsersExceptFriends = () => {
    dispatch(getUsersExceptFriends(search))
      .unwrap()
      .then((data) => {
        setAllUsers(data);
      })
      .catch(() => {});
  };

  const handlerSearch = () => {
    handlerGetFriends();
    handlerGetUsersExceptFriends();
  };

  useEffect(() => {
    handlerGetFriends();
    handlerGetUsersExceptFriends();

    return () => {
      dispatch(setAllFriends([]));
    };
  }, []);

  return (
    <AllContainer>
      <ApplicationsFriends />
      <Friends handlerSearch={handlerSearch} />
      <AllUsers users={allUsers} />
    </AllContainer>
  );
};

export default Users;
