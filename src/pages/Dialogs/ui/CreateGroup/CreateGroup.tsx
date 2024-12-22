import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ObserverList } from '@shared/components';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import {
  selectorErrorFriends,
  selectorFriends,
  selectorFriendsHaseMore,
  selectorLoadingFriends,
  selectorPageFriends,
  addPage,
  getFriends,
  IUser,
} from '@entities/friends';
import { selectorProfile } from '@entities/profile';
import { PickFriend } from '@widgets/PickFriend';
import { Affix } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchAndFilterTags } from '@widgets/SearchAndFilterTags';
import { createDialog } from '@entities/dialogs';
import { BaseInput } from '@shared/ui';

import { SClose } from '../dialogs.styles';
import { SBaseButton, SContainer, SFormCreate, SFriends, SHeader } from './createGroup.styles';
import { ICreateGroup } from '../../model/createGroup.types';

const CreateGroup: FC<ICreateGroup> = ({ changeStage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectorProfile);

  const friends = useAppSelector(selectorFriends);
  const loading = useAppSelector(selectorLoadingFriends);
  const error = useAppSelector(selectorErrorFriends);
  const page = useAppSelector(selectorPageFriends);
  const haseMore = useAppSelector(selectorFriendsHaseMore);

  const [search, setSearch] = useState('');
  const [searchView, setSearchView] = useState('');
  const [nameChat, setNameChat] = useState('');

  const [usersPick, setUsersPick] = useState<IUser[]>([]);

  const errorMessage = error ? 'Произошла ошибка' : 'Друзья не найдены';

  const handlerGetFriends = () => {
    dispatch(getFriends({ id: user.id, page: 1, search }));
  };

  const searchFriends = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handlerNextPage = async () => {
    dispatch(getFriends({ id: user.id, page: page + 1, search }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  const clearSearch = () => {
    setSearch('');
    setSearchView('');
  };

  // TODO: мб тут что-то не так после переименования currentUser
  const pickUser = (currentUser: IUser) => {
    const findUserInUsersPick = usersPick.find((el) => el.id === currentUser.id);

    if (!findUserInUsersPick) setUsersPick((prev) => [currentUser, ...prev]);
    else {
      const filterUserIds = usersPick.filter((userInPick) => userInPick.id !== currentUser.id);
      setUsersPick(filterUserIds);
    }

    clearSearch();
  };

  const handlerCreateChat = () => {
    dispatch(createDialog({ participantIds: usersPick.map((el) => el.id), nameChat }))
      .unwrap()
      .then(({ id }) => navigate(`/dialog/${id}`));
  };

  useEffect(() => {
    handlerGetFriends();
  }, [search]);

  return (
    <SContainer>
      <SHeader>
        <h2>Создание чата</h2>
        <SClose onClick={changeStage} />
      </SHeader>
      <SearchAndFilterTags
        search={searchView}
        setSearch={setSearchView}
        handlerSearch={searchFriends}
        setUsersPick={setUsersPick}
        picks={usersPick}
      />
      <SFriends>
        <ObserverList<IUser>
          list={friends}
          itemContent={(userCurrent) => (
            <PickFriend
              key={userCurrent.id}
              usersPick={usersPick}
              pickUser={pickUser}
              user={userCurrent}
            />
          )}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          notFoundMessage={errorMessage}
          skeleton={() => <div>Загрузка...</div>}
          isPending={loading}
        />
      </SFriends>
      <Affix offsetTop={10}>
        <SFormCreate>
          <BaseInput
            onChange={(e) => setNameChat(e.target.value)}
            placeholder="Придумайте название для чата"
            isBgTransparent
          />
          <SBaseButton
            onClick={handlerCreateChat}
            disabled={usersPick.length <= 1 || nameChat.length <= 3}
            size="middle"
          >
            Создать чат
          </SBaseButton>
        </SFormCreate>
      </Affix>
    </SContainer>
  );
};

export default CreateGroup;
