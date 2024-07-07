import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import React, { FC, KeyboardEvent } from 'react';
import { logout } from '@entities/auth';
import { useAppDispatch } from '@shared/hooks';
import { SocketApi } from '@shared/api';

const Exit: FC = () => {
  const dispatch = useAppDispatch();

  const handlerLogout = () => {
    SocketApi.socket?.disconnect();
    dispatch(logout());
  };

  const handlerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handlerLogout();
    }
  };

  return (
    <div onKeyDown={handlerKeyDown} onClick={handlerLogout}>
      Выйти
    </div>
  );
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
