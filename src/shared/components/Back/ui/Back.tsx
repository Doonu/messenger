import React, { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { SBack } from './back.styles';
import { BackTypes } from '../model/back.types';

export const Back: FC<BackTypes> = ({ handlerClick }) => {
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
