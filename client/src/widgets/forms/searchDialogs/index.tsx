import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import BaseInput from 'shared/components/ui/inputs/baseInput';
import { IoCreateOutline } from 'react-icons/io5';
import { MdAddCall } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { SSearchDialogsStyled, SServices } from './searchDialogs.styled';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSearch } from 'entities/dialogs/dialogs.slice';
import { selectorSearch } from 'entities/dialogs/dialogs.selectors';
import debounce from 'lodash.debounce';

interface ISearchDialogs {
  changeServiceCreate: () => void;
}

const SearchDialogs: FC<ISearchDialogs> = ({ changeServiceCreate }) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectorSearch);

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

export default SearchDialogs;
