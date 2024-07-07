import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { message as messageAntd, notification } from 'antd';
import { clearMessage, messagesSelectors } from '@entities/notification';

import notificationConfig from './lib/config';

// TODO: Разобраться с типами
// TODO: Сразу с компонентами делать лоадеры

export const Notification = () => {
  const dispatch = useAppDispatch();

  const { title, type, level } = useAppSelector(messagesSelectors);

  const [notificationApi, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMessage] = messageAntd.useMessage();

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
