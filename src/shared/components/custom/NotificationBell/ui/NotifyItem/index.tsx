import React from 'react';
import { PhotoProfile } from '@shared/components';
import { postTime } from '@shared/util';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@shared/hooks';
import { Close } from '@shared/assets';
import { deleteNotification, INotifyItem } from '@entities/notification';

import { SClose, SContent, SDate, SInfo, SNotifyItem, SUser } from './notifyItem.styled';

export const NotifyItem = ({ sender, content, createdAt, id }: INotifyItem) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerLinkNotification = () => {
    if (sender) {
      dispatch(deleteNotification(id));
      navigate(`/profile/${sender.id}`);
    }
  };

  const handlerDeleteNotification = () => {
    dispatch(deleteNotification(id));
  };

  return (
    <SNotifyItem>
      <SInfo onClick={handlerLinkNotification}>
        <SUser>{sender?.avatar && <PhotoProfile img={sender.avatar} name={sender.name} />}</SUser>
        <SContent>
          <div>{content}</div>
          <SDate>{postTime(createdAt)}</SDate>
        </SContent>
      </SInfo>
      <SClose>
        <Close fontSize={20} onClick={handlerDeleteNotification} />
      </SClose>
    </SNotifyItem>
  );
};
