import React from 'react';
import { FC } from 'react';
import { SocketApi } from 'shared/api';
import PhotoProfile from 'components/custom/profiles/photo';
import { SButtons } from '../post/ui/modification/modification.styled';
import BaseButton from 'components/ui/buttons/baseButton';
import { SContainer, SContent, SName } from './applicationFriend.styled';
import { useNavigate } from 'react-router-dom';
import { addFriend } from 'entities/friends/friends.slice';
import { useAppDispatch } from 'hooks/redux';
import { IItemApplicationsFriends } from './model/IApplicationFriend';

const ApplicationFriend: FC<IItemApplicationsFriends> = ({ request, filterRequest }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerFriendAcceptWS = () => {
    SocketApi.socket?.emit('accept_friend_request', {
      idFriendRequest: request?.id,
    });

    filterRequest(request?.id);
    dispatch(addFriend(request.sender));
  };

  const handlerCancellationAddFriendWS = () => {
    SocketApi.socket?.emit('cancellation_add_friend', {
      idFriendRequest: request?.id,
    });

    filterRequest(request?.id);
  };

  return (
    <SContainer key={request.id} onClick={() => navigate(`/profile/${request.sender.id}`)}>
      <PhotoProfile size={70} img={request.sender.avatar} name={request.sender.name} />
      <SContent>
        <SName>{request.sender.name}</SName>
        <SButtons>
          <BaseButton height="30px" onClick={handlerFriendAcceptWS}>
            Принять предложение
          </BaseButton>
          <BaseButton height="30px" onClick={handlerCancellationAddFriendWS} bgTransparent>
            Отменить предложение
          </BaseButton>
        </SButtons>
      </SContent>
    </SContainer>
  );
};

export default ApplicationFriend;
