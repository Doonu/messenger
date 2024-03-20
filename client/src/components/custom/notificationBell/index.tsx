import React, { useEffect } from 'react';
import { Bell } from '../../../shared/assets/icons';
import { Dropdown } from 'antd';
import Header from './ui/header';
import { SContent, SList, SNotificationBellStyled } from './ui/notificationBell.styled';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { notificationSelectors } from '../../../entities/notification/notification.selectors';
import { deleteAllNotifications, getAllNotification } from '../../../shared/api';
import NotifyItem from './ui/notifyItem';
import Badge from '../signals/badge';
import { selectorProfile } from '../../../entities';

const NotificationBell = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);
  const notification = useAppSelector(notificationSelectors);

  const handlerGetAllNotification = () => dispatch(getAllNotification());

  const handlerDeleteNotification = () => user?.id && dispatch(deleteAllNotifications(user.id));

  useEffect(() => {
    if (notification.length === 0) handlerGetAllNotification();
  }, []);

  return (
    <Dropdown
      placement={'bottomRight'}
      dropdownRender={() => (
        <SNotificationBellStyled>
          <Header deleteAllNotification={handlerDeleteNotification} />
          <SList>
            {notification.map((item) => (
              <NotifyItem key={item.id} {...item} />
            ))}
          </SList>
        </SNotificationBellStyled>
      )}
    >
      <SContent>
        <Badge count={notification.length} />
        <Bell />
      </SContent>
    </Dropdown>
  );
};

export default NotificationBell;
