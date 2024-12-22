import React, { FC } from 'react';
import { Magnifier } from '@shared/assets';
import { BaseInput } from '@shared/ui';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { selectorFriendsSearch, setSearch } from '@entities/friends';

import { SBaseButton, SContainer } from './searchUsers.styled';
import { ISearchUsers } from '../model/ISearch';

// TODO: Совместить два компонента, в создание группы в диалогах и в друзьях
export const SearchUsers: FC<ISearchUsers> = ({ handlerSearch }) => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectorFriendsSearch);

  return (
    <SContainer>
      <BaseInput
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Поиск друзей"
        height="40px"
        border="rightNone"
      />
      <SBaseButton onClick={handlerSearch} rightIcon={<Magnifier />} />
    </SContainer>
  );
};
