import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { message as messageAntd, notification } from 'antd';
import { clearMessage } from 'entities/notification/notification.slice';
import notificationConfig from './lib/config';
import { messagesSelectors } from 'entities/notification/notification.selectors';

//TODO: Разобраться с типами
//TODO: Сразу с компонентами делать лоадеры

const Notification = () => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMessage] = messageAntd.useMessage();

  const dispatch = useAppDispatch();
  const { title, type, level } = useAppSelector(messagesSelectors);

  useEffect(() => {
    if (level === 'medium' && title && type) {
      notificationApi[type](notificationConfig({ type, message: title }));
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
