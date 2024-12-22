import React, { FC } from 'react';
import { BaseButton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import { addFriend, cancellationAddFriend, friendAccept } from '@entities/friends';
import { useAppDispatch } from '@shared/hooks';
import { PhotoProfile } from '@shared/components';

import { SButtons, SContainer, SContent, SName } from './applicationFriend.styled';
import { IItemApplicationsFriends } from '../model/IApplicationFriend';

export const ApplicationFriend: FC<IItemApplicationsFriends> = ({ request, filterRequest }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerFriendAcceptWS = () => {
    friendAccept({ idFriendRequest: request?.id });

    filterRequest(request?.id);
    dispatch(addFriend(request.sender));
  };

  const handlerCancellationAddFriendWS = () => {
    cancellationAddFriend({ idFriendRequest: request?.id });
    filterRequest(request?.id);
  };

  return (
    <SContainer key={request.id}>
      <PhotoProfile size={70} img={request.sender.avatar} name={request.sender.name} />
      <SContent>
        <SName onClick={() => navigate(`/profile/${request.sender.id}`)}>
          {request.sender.name}
        </SName>
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
