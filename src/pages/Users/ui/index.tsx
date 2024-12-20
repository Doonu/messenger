import React, { useEffect, useState } from 'react';
import { AllContainer } from '@shared/components';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import {
  getFriends,
  getUsersExceptFriends,
  IUserExcept,
  selectorFriendsSearch,
} from '@entities/friends';

import Friends from './friends';
import AllUsers from './allUsers';
import ApplicationsFriends from './applicationsFriends';

const Users = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);
  const search = useAppSelector(selectorFriendsSearch);

  const [allUsers, setAllUsers] = useState<IUserExcept[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [pageUsers, setPageUsers] = useState(0);
  const [haseMoreUsers, setHaseMore] = useState(true);

  const handlerGetFriends = () => {
    dispatch(getFriends({ id: user.id, page: 1, search }));
  };

  const handlerGetUsersExceptFriends = () => {
    dispatch(getUsersExceptFriends({ page: 1, search }))
      .unwrap()
      .then((data) => {
        setAllUsers(data);
        setPageUsers((prev) => prev);
      })
      .catch(() => {})
      .finally(() => {
        setLoadingUsers(false);
      });
  };

  const handlerNextPage = async () => {
    dispatch(getUsersExceptFriends({ page: pageUsers + 1, search }))
      .unwrap()
      .then((data) => {
        if (!data.length) setHaseMore(false);
        setPageUsers((prev) => prev + 1);
        setAllUsers((prevData) => [...prevData, ...data]);
      });
  };

  const handlerSearch = () => {
    handlerGetFriends();
    handlerGetUsersExceptFriends();
  };

  useEffect(() => {
    if (user.id) {
      handlerGetFriends();
      handlerGetUsersExceptFriends();
    }
  }, [user.id]);

  return (
    <AllContainer>
      <ApplicationsFriends />
      <Friends handlerSearch={handlerSearch} />
      <AllUsers
        handlerNextPage={handlerNextPage}
        loading={loadingUsers}
        haseMore={haseMoreUsers}
        users={allUsers}
      />
    </AllContainer>
  );
};

export default Users;
