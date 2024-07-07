import React, { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { SBack } from './back.styled';
import { IBack } from '../model/IBack';

export const Back: FC<IBack> = ({ handlerClick }) => {
  const navigate = useNavigate();

  const handlerBack = () => {
    if (handlerClick) {
      handlerClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <SBack onClick={handlerBack}>
      <IoIosArrowBack size={25} />
      <div>Назад</div>
    </SBack>
  );
};
