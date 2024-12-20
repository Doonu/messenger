import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { SearchAndFilterTags } from '@widgets/forms';
import { ObserverList } from '@shared/components';
import { PickFriend } from '@widgets/items';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { addNewUsers } from '@shared/api';
import { Affix } from 'antd';
import { getUsersExceptInChat, selectorProfile } from '@entities/profile';
import { useParams } from 'react-router-dom';
import { IUser } from '@entities/friends';

import Navigate from './Navigate';
import { SBaseButton, SForm, SList } from './addUsersStage.styled';
import { IChatInfo, StageChatInfo } from '../../model/IChatInfo';

interface IAddUsersStage extends IChatInfo {
  switchStage: (stage: StageChatInfo) => void;
}

const AddUsersStage: FC<IAddUsersStage> = ({ chat, switchStage }) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const idParam = params.id;

  const profile = useAppSelector(selectorProfile);

  const [search, setSearch] = useState('');
  const [searchView, setSearchView] = useState('');
  const [usersPick, setUsersPick] = useState<IUser[]>([]);

  const [friendsException, setFriendException] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [haseMore, setHaseMore] = useState(true);

  const errorMessage = error ? 'Произошла ошибка' : 'Больше некого добавить в диалог из друзей';

  const searchUsers = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const clearSearch = () => {
    setSearch('');
    setSearchView('');
  };

  const pickUser = (user: IUser) => {
    const findUserInUsersPick = usersPick.find((el) => el.id === user.id);

    if (!findUserInUsersPick) setUsersPick((prev) => [user, ...prev]);
    else {
      const filterUserIds = usersPick.filter((userInPick) => userInPick.id !== user.id);
      setUsersPick(filterUserIds);
    }

    clearSearch();
  };

  const getUsers = () => {
    const usersId = chat?.participants?.map((el) => el.id);

    dispatch(getUsersExceptInChat({ exceptions: usersId || [], page, search }))
      .unwrap()
      .then((data) => {
        if (!data.length) setHaseMore(false);
        setFriendException(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlerNextPage = async () => {
    const usersId = chat?.participants?.map((el) => el.id);

    setLoading(true);

    dispatch(getUsersExceptInChat({ exceptions: usersId || [], page: page + 1, search }))
      .unwrap()
      .then((data) => {
        if (!data.length) setHaseMore(false);
        setFriendException((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlerAddUsers = () => {
    if (idParam) {
      const usersIds = usersPick.map((el) => el.id);
      addNewUsers({ userId: profile.id, dialogId: +idParam, participants: usersIds });
      switchStage('main');
    }
  };

  useEffect(() => {
    getUsers();
  }, [search]);

  return (
    <>
      <Navigate switchStage={switchStage} />
      <SearchAndFilterTags
        search={searchView}
        setSearch={setSearchView}
        handlerSearch={searchUsers}
        setUsersPick={setUsersPick}
        picks={usersPick}
      />

      <SList>
        <ObserverList
          list={friendsException}
          itemContent={(user) => (
            <PickFriend key={user.id} usersPick={usersPick} pickUser={pickUser} user={user} />
          )}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          notFoundMessage={errorMessage}
          skeleton={() => <div>Загрузка...</div>}
          isPending={loading}
        />
      </SList>
      <Affix offsetTop={10}>
        <SForm>
          <SBaseButton disabled={!usersPick.length} onClick={handlerAddUsers}>
            Добавить собеседника
          </SBaseButton>
        </SForm>
      </Affix>
    </>
  );
};

export default AddUsersStage;
