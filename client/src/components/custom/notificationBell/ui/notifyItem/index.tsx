import React from 'react';
import { SContent, SDate, SNotifyItem } from './notifyItem.styled';
import PhotoProfile from '../../../profiles/photo';
import { INotifyItem } from '../../../../../entities/notification/model/INotification';
import { postTime } from '../../../../../shared/util/time';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/redux';
import deleteNotification from '../../../../../shared/api/http/notification/deleteNotifigation';

const NotifyItem = ({ sender, content, createdAt }: INotifyItem) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerNotification = () => {
    if (sender) {
      navigate(`/profile/${sender.id}`);
      dispatch(deleteNotification(sender.id));
    }
  };

  return (
    <SNotifyItem onClick={handlerNotification}>
      <div>{sender?.avatar && <PhotoProfile img={sender.avatar} name={sender.name} />}</div>
      <SContent>
        <div>{content}</div>
        <SDate>{postTime(createdAt)}</SDate>
      </SContent>
    </SNotifyItem>
  );
};

export default NotifyItem;
