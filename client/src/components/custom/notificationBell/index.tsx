import React, { useEffect } from 'react';
import { Bell } from 'shared/assets/icons';
import { Dropdown } from 'antd';
import Header from './ui/header';
import { SContent, SList, SNotificationBellStyled } from './ui/notificationBell.styled';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  notificationCountSelectors,
  notificationHaseMoreSelectors,
  notificationLimitSelectors,
  notificationLoadingSelectors,
  notificationPageSelectors,
  notificationSelectors,
} from 'entities/notification/notification.selectors';
import { deleteAllNotifications, getAllNotification } from 'shared/api';
import NotifyItem from './ui/notifyItem';
import Badge from '../signals/badge';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { BaseList } from '../lists/BaseList';
import { addPage } from 'entities/notification/notification.slice';
import { getAllNotificationCount } from 'shared/api';

const NotificationBell = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);

  const notification = useAppSelector(notificationSelectors);
  const countNotification = useAppSelector(notificationCountSelectors);
  const page = useAppSelector(notificationPageSelectors);
  const loading = useAppSelector(notificationLoadingSelectors);
  const limit = useAppSelector(notificationLimitSelectors);
  const haseMore = useAppSelector(notificationHaseMoreSelectors);

  const handlerGetAllNotification = () =>
    dispatch(getAllNotification({ page: 1, limit }))
      .unwrap()
      .catch(() => {});

  const handlerAllCount = () => dispatch(getAllNotificationCount());

  const handlerNextPageGetAllNotification = () => {
    dispatch(getAllNotification({ page: page + 1, limit }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      })
      .catch(() => {});
  };

  const handlerDeleteNotification = () => user?.id && dispatch(deleteAllNotifications(user.id));

  useEffect(() => {
    if (notification.length === 0) {
      handlerGetAllNotification();
      handlerAllCount();
    }
  }, []);

  return (
    <Dropdown
      placement={'bottomRight'}
      dropdownRender={() => (
        <SNotificationBellStyled>
          <Header deleteAllNotification={handlerDeleteNotification} />
          <SList>
            <BaseList
              isPadding={false}
              list={notification}
              isPending={loading}
              itemContent={(item) => <NotifyItem key={item.id} {...item} />}
              isBorderBottom
              hasMore={haseMore}
              fetchNextPage={handlerNextPageGetAllNotification}
            />
          </SList>
        </SNotificationBellStyled>
      )}
    >
      <SContent>
        <Badge count={countNotification} />
        <Bell />
      </SContent>
    </Dropdown>
  );
};

export default NotificationBell;
