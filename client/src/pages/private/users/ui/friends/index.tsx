import React, { FC, useState } from 'react';
import { SContainerUsers } from '../user.styled';
import Segmented from 'components/ui/segment';
import SearchUsers from 'widgets/forms/searchUsers';
import { ObserverList } from 'components/custom/lists/ObserverList';
import { Friend } from 'widgets/items/friend';
import { generateOptions } from '../../lib/options';
import getFriends from 'shared/api/http/user/getFriends';
import { addPage } from 'entities/friends/friends.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  selectorErrorFriends,
  selectorFriends,
  selectorHaseMore,
  selectorLoadingFriends,
  selectorPageFriends,
  selectorSearch,
} from 'entities/friends/friends.selectors';
import { selectorProfile } from 'entities/profile/profile.selectors';

interface IFriends {
  handlerSearch: () => void;
}

const Friends: FC<IFriends> = ({ handlerSearch }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);

  const friends = useAppSelector(selectorFriends);
  const loading = useAppSelector(selectorLoadingFriends);
  const error = useAppSelector(selectorErrorFriends);
  const page = useAppSelector(selectorPageFriends);
  const haseMore = useAppSelector(selectorHaseMore);
  const search = useAppSelector(selectorSearch);

  const [choiceUser, setChoiceUser] = useState('all');

  const notConnectedUsers = friends.filter((friend) => friend.statusConnected === true);
  const options = generateOptions({ counts: [friends.length, notConnectedUsers.length] });

  const errorMessage = error ? 'Произошла ошибка' : 'Друзья не найдены';

  const handlerNextPage = () => {
    dispatch(getFriends({ id: user.id, page: page + 1, search }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  return (
    <SContainerUsers>
      <Segmented
        value={choiceUser}
        onChange={(value) => typeof value === 'string' && setChoiceUser(value)}
        options={options}
      />
      <SearchUsers handlerSearch={handlerSearch} />

      <div>
        <ObserverList
          list={choiceUser === 'all' ? friends : notConnectedUsers}
          itemContent={(user) => <Friend isBorderFirst={false} user={user} type="friend" />}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          notFoundMessage={errorMessage}
          skeleton={() => <div>Загрузка...</div>}
          isPending={loading}
        />
      </div>
    </SContainerUsers>
  );
};

export default Friends;
