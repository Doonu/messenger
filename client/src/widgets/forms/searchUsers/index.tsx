import React, { FC } from 'react';
import { Magnifier } from 'shared/assets/icons';
import { SBaseButton, SContainer } from './searchUsers.styled';
import BaseInput from 'components/ui/inputs/baseInput';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectorSearch } from 'entities/friends/friends.selectors';
import { setSearch } from 'entities/friends/friends.slice';
import { ISearchUsers } from './model/ISearch';

const SearchUsers: FC<ISearchUsers> = ({ handlerSearch }) => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectorSearch);

  return (
    <SContainer>
      <BaseInput
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Поиск друзей"
        height={'40px'}
        border="rightNone"
      />
      <SBaseButton onClick={handlerSearch} rightIcon={<Magnifier />} />
    </SContainer>
  );
};

export default SearchUsers;
