import React, { useEffect } from 'react';
import AllContainer from '../../../../components/layouts/all';
import ApplicationsFriends from './applicationsFriends';
import { ObserverList } from '../../../../components/custom/lists/ObserverList';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import getFriends from '../../../../shared/api/http/user/getFriends';
import { selectorProfile } from '../../../../entities';
import {
  selectorErrorFriends,
  selectorFriends,
  selectorHaseMore,
  selectorLoadingFriends,
  selectorPageFriends,
  selectorSearch,
} from '../../../../entities/friends/friends.selectors';
import { setAllFriends } from '../../../../entities/friends/friends.slice';
import { addPage } from '../../../../entities/friends/friends.slice';
import { Friend } from '../../../../widgets/items/friend';
import { SContainerUsers } from './user.styled';
import SearchUsers from '../../../../widgets/forms/searchUsers';

const Users = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);

  const friends = useAppSelector(selectorFriends);
  const loading = useAppSelector(selectorLoadingFriends);
  const error = useAppSelector(selectorErrorFriends);
  const page = useAppSelector(selectorPageFriends);
  const haseMore = useAppSelector(selectorHaseMore);
  const search = useAppSelector(selectorSearch);

  const errorMessage = error ? 'Произошла ошибка' : 'Друзья не найдены';

  const handlerNextPage = () => {
    dispatch(getFriends({ id: user.id, page: page + 1, search }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  const handlerSearch = () => {
    dispatch(getFriends({ id: user.id, page: 1, search }));
  };

  useEffect(() => {
    handlerSearch();

    return () => {
      dispatch(setAllFriends([]));
    };
  }, []);

  return (
    <AllContainer>
      <ApplicationsFriends />

      <SContainerUsers>
        <SearchUsers handlerSearch={handlerSearch} />

        <ObserverList
          list={friends}
          itemContent={(user) => <Friend {...user} />}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          notFoundMessage={errorMessage}
          skeleton={() => <div>Загрузка...</div>}
          isPending={loading}
        />
      </SContainerUsers>
    </AllContainer>
  );
};

export default Users;
