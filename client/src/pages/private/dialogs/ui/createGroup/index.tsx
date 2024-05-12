import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  SBaseButton,
  SContainer,
  SFormCreate,
  SFormSearch,
  SFriends,
  SHeader,
} from './createGroup.styled';
import Input from 'components/ui/inputs/baseInput';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  selectorErrorFriends,
  selectorFriends,
  selectorHaseMore,
  selectorLoadingFriends,
  selectorPageFriends,
} from 'entities/friends/friends.selectors';
import getFriends from 'shared/api/http/user/getFriends';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { ObserverList } from 'components/custom/lists/ObserverList';
import { addPage } from 'entities/friends/friends.slice';
import PickFriend from 'widgets/items/pickFriend';
import { IUser } from 'shared/models/IUser';
import { SClose, STag, STags } from '../dialogs.styled';
import { Affix } from 'antd';
import HorizontalList from 'components/custom/lists/HorizontalList';
import { ContainerByIcon } from 'shared/styles/containers';
import debounce from 'lodash.debounce';
import createDialog from 'shared/api/http/dialogs/createDialog';
import { useNavigate } from 'react-router-dom';

interface ICreateGroup {
  changeStage: () => void;
}

const CreateGroup: FC<ICreateGroup> = ({ changeStage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectorProfile);

  const friends = useAppSelector(selectorFriends);
  const loading = useAppSelector(selectorLoadingFriends);
  const error = useAppSelector(selectorErrorFriends);
  const page = useAppSelector(selectorPageFriends);
  const haseMore = useAppSelector(selectorHaseMore);

  const [search, setSearch] = useState('');
  const [searchView, setSearchView] = useState('');
  const [nameChat, setNameChat] = useState('');

  const [usersPick, setUsersPick] = useState<IUser[]>([]);

  const errorMessage = error ? 'Произошла ошибка' : 'Друзья не найдены';

  const handlerGetFriends = () => {
    dispatch(getFriends({ id: user.id, page: 1, search: search }));
  };

  const handlerNextPage = () => {
    dispatch(getFriends({ id: user.id, page: page + 1, search }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  const searchFriends = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const debounceSearch = debounce(searchFriends, 500);

  const pickUser = (user: IUser) => {
    const findUserInUsersPick = usersPick.find((el) => el.id === user.id);

    if (!findUserInUsersPick) setUsersPick((prev) => [user, ...prev]);
    else {
      const filterUserIds = usersPick.filter((userInPick) => userInPick.id !== user.id);
      setUsersPick(filterUserIds);
    }

    clearSearch();
  };

  const clearSearch = () => {
    setSearch('');
    setSearchView('');
  };

  const filterPickUser = (userId: number) => {
    const filterUserIds = usersPick.filter((userInPick) => userInPick.id !== userId);
    setUsersPick(filterUserIds);
  };

  const handlerCreateChat = () => {
    dispatch(createDialog({ participantIds: usersPick.map((el) => el.id), nameChat: nameChat }))
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
      <SFormSearch>
        <Input
          value={searchView}
          isBgTransparent
          onInput={debounceSearch}
          onChange={(e) => setSearchView(e.target.value)}
          placeholder="Введите имя"
        />
        <STags>
          <HorizontalList
            list={usersPick}
            itemContent={(el) => (
              <STag key={el.id}>
                <div>{el.name}</div>
                <ContainerByIcon>
                  <SClose size={5} onClick={() => filterPickUser(el.id)} />
                </ContainerByIcon>
              </STag>
            )}
            loading={false}
          />
        </STags>
      </SFormSearch>
      <SFriends>
        <ObserverList
          list={friends}
          itemContent={(user) => (
            <PickFriend usersPick={usersPick} pickUser={pickUser} user={user} />
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
          <Input
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
