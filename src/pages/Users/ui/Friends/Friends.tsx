import React, { FC, useState } from 'react';
import { ObserverList } from '@shared/components';
import { SearchUsers } from '@widgets/SearchUsers';
import { Friend } from '@widgets/Friend';
import {
  addPage,
  selectorErrorFriends,
  selectorFriends,
  selectorFriendsHaseMore,
  selectorLoadingFriends,
  selectorPageFriends,
  selectorFriendsSearch,
  getFriends,
  IUser,
} from '@entities/friends';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { Segment } from '@shared/ui';

import { IFriendsProps } from '../../model/friends.types';
import { generateOptions } from '../../lib/options';
import { SContainerUsers } from '../user.styles';

const Friends: FC<IFriendsProps> = ({ handlerSearch }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);

  const friends = useAppSelector(selectorFriends);
  const loading = useAppSelector(selectorLoadingFriends);
  const error = useAppSelector(selectorErrorFriends);
  const page = useAppSelector(selectorPageFriends);
  const haseMore = useAppSelector(selectorFriendsHaseMore);
  const search = useAppSelector(selectorFriendsSearch);

  const [choiceUser, setChoiceUser] = useState('all');

  const notConnectedUsers = friends.filter((friend) => friend.statusConnected === true);
  const options = generateOptions({ counts: [friends.length, notConnectedUsers.length] });

  const errorMessage = error ? 'Произошла ошибка' : 'Друзья не найдены';

  const handlerNextPage = async () => {
    dispatch(getFriends({ id: user.id, page: page + 1, search }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  return (
    <SContainerUsers>
      <Segment
        value={choiceUser}
        onChange={(value) => setChoiceUser(value as string)}
        options={options}
      />
      <SearchUsers handlerSearch={handlerSearch} />

      <div>
        <ObserverList<IUser>
          list={choiceUser === 'all' ? friends : notConnectedUsers}
          itemContent={(itemUser) => (
            <Friend key={itemUser.id} isBorderFirst={false} user={itemUser} type="friend" />
          )}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          notFoundMessage={errorMessage}
          skeleton={(item) => <div key={item}>Загрузка...{item}</div>}
          isPending={loading}
        />
      </div>
    </SContainerUsers>
  );
};

export default Friends;
