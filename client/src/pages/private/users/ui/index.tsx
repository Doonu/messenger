import React, { useEffect, useState } from 'react';
import AllContainer from 'shared/components/layouts/all';
import ApplicationsFriends from './applicationsFriends';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import getFriends from 'shared/api/http/user/getFriends';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { selectorSearch } from 'entities/friends/friends.selectors';
import { setAllFriends, setSearch } from 'entities/friends/friends.slice';
import { getUsersExceptFriends } from 'shared/api';
import Friends from './friends';
import AllUsers from './allUsers';
import { IUserExcept } from 'shared/models/IUser';

const Users = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);
  const search = useAppSelector(selectorSearch);

  const [allUsers, setAllUsers] = useState<IUserExcept[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [pageUsers, setPageUsers] = useState(0);
  const [haseMoreUsers, setHaseMore] = useState(true);

  const handlerGetFriends = () => {
    dispatch(getFriends({ id: user.id, page: 1, search }));
  };

  const handlerGetUsersExceptFriends = () => {
    dispatch(getUsersExceptFriends({ page: 1, search: search }))
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
    dispatch(getUsersExceptFriends({ page: pageUsers + 1, search: search }))
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
    handlerGetFriends();
    handlerGetUsersExceptFriends();

    return () => {
      dispatch(setAllFriends([]));
      dispatch(setSearch(''));
    };
  }, []);

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
