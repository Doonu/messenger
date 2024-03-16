import React, { useEffect } from 'react';
import { Bell } from '../../../shared/assets/icons';
import { Dropdown } from 'antd';
import Header from './ui/header';
import { SNotificationBellStyled } from './ui/notificationBell.styled';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { notificationSelectors } from '../../../entities/notification/notification.selectors';
import getAllNotification from '../../../shared/api/http/notification/getAllNotification';
import NotifyItem from './ui/notifyItem';

const NotificationBell = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(notificationSelectors);

  const handlerGetAllNotification = () => dispatch(getAllNotification());

  useEffect(() => {
    if (notification.length === 0) handlerGetAllNotification();
  }, []);

  return (
    <Dropdown
      placement={'bottomRight'}
      dropdownRender={() => (
        <SNotificationBellStyled>
          <Header />
          {notification.map((item) => (
            <NotifyItem key={item.id} {...item} />
          ))}
        </SNotificationBellStyled>
      )}
    >
      <Bell />
    </Dropdown>
  );
};

export default NotificationBell;
