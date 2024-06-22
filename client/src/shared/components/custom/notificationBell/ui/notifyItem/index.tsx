import React from 'react';
import { SClose, SContent, SDate, SInfo, SNotifyItem, SUser } from './notifyItem.styled';
import PhotoProfile from 'shared/components/custom/profiles/photo';
import { INotifyItem } from 'shared/models/INotification';
import { postTime } from 'shared/util/time';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { deleteNotification } from 'shared/api';
import { Close } from 'shared/assets/icons';

const NotifyItem = ({ sender, content, createdAt, id }: INotifyItem) => {
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

export default NotifyItem;
