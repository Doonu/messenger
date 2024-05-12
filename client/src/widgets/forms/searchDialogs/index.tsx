import React, { FC } from 'react';
import BaseInput from 'components/ui/inputs/baseInput';
import { IoCreateOutline } from 'react-icons/io5';
import { MdAddCall } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { SSearchDialogsStyled, SServices } from './searchDialogs.styled';

interface ISearchDialogs {
  changeServiceCreate: () => void;
}

const SearchDialogs: FC<ISearchDialogs> = ({ changeServiceCreate }) => {
  return (
    <SSearchDialogsStyled>
      <BaseInput prevIcon={<FaSearch />} placeholder="Поиск" isBgTransparent />
      <SServices>
        <MdAddCall size={25} />
        <IoCreateOutline onClick={changeServiceCreate} size={28} />
        <IoIosMore size={25} />
      </SServices>
    </SSearchDialogsStyled>
  );
};

export default SearchDialogs;
