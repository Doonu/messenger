import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { BaseInput } from '@shared/ui';
import { IoCreateOutline } from 'react-icons/io5';
import { MdAddCall } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { setSearch, selectorDialogsSearch } from '@entities/dialogs';
import debounce from 'lodash.debounce';
import { useAppSelector, useAppDispatch } from '@shared/hooks';

import { SSearchDialogsStyled, SServices } from './searchDialogs.styled';
import { ISearchDialogs } from '../model/ISearchDialogs';

export const SearchDialogs: FC<ISearchDialogs> = ({ changeServiceCreate }) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectorDialogsSearch);

  const [value, setValue] = useState(search);

  const handlerSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const debounceSearch = useMemo(() => debounce(handlerSearch, 500), []);

  return (
    <SSearchDialogsStyled>
      <BaseInput
        value={value}
        prevIcon={<FaSearch />}
        placeholder="Поиск"
        isBgTransparent
        onChange={(e) => setValue(e.target.value)}
        onInput={debounceSearch}
      />
      <SServices>
        <MdAddCall size={25} />
        <IoCreateOutline onClick={changeServiceCreate} size={28} />
        <IoIosMore size={25} />
      </SServices>
    </SSearchDialogsStyled>
  );
};
