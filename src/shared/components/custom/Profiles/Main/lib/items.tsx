import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { logout } from '@entities/auth';
import { useAppDispatch } from '@shared/hooks';
import { SocketApi } from '@shared/api';

const Exit: FC = () => {
  const dispatch = useAppDispatch();
  const handlerLogout = () => {
    SocketApi.socket?.disconnect();
    dispatch(logout());
  };

  return <div onClick={handlerLogout}>Выйти</div>;
};

export const itemsDropdown: MenuProps['items'] = [
  {
    label: <Link to="/profile">Профиль</Link>,
    key: '0',
  },
  {
    type: 'divider',
  },
  { label: <div>Сменить аватарку</div>, key: '1' },
  {
    type: 'divider',
  },
  {
    label: <Exit />,
    key: '2',
  },
];
