import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { message as messageAntd, notification } from 'antd';
import { clearMessage } from '../../../entities/notification/notification.slice';
import notificationConfig from './lib/config';

//TODO: Разобраться с типами
//TODO: Сразу с компонентами делать лоадеры

const Notification = () => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMessage] = messageAntd.useMessage();

  const dispatch = useAppDispatch();
  const { title, type, level, onClick } = useAppSelector((data) => data.notificationSlice.message);

  useEffect(() => {
    if (level === 'medium' && title && type) {
      notificationApi[type](notificationConfig({ type, message: title, onClick }));
    }
    if (level === 'low' && title && type) {
      messageApi[type](title);
    }
    dispatch(clearMessage());
  }, [title]);
  return (
    <>
      {contextHolder}
      {contextHolderMessage}
    </>
  );
};

export default Notification;
