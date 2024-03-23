import React, { FC } from 'react';
import PhotoProfile from '../../../components/custom/profiles/photo';
import BaseButton from '../../../components/ui/buttons/baseButton';
import SocketApi from '../../../shared/api/socket/socket-api';
import { SItemRequest, SName, SMainContent, SButtons } from './ItemApplicationsFriends.styled';
import { IAllFriendRequests } from '../../../shared/models/IFriendRequest';

interface IItemApplicationsFriends {
  request: IAllFriendRequests;
  filterRequest: (id: number) => void;
}

const ItemApplicationsFriends: FC<IItemApplicationsFriends> = ({ request, filterRequest }) => {
  const handlerFriendAcceptWS = () => {
    SocketApi.socket?.emit('accept_friend_request', {
      idFriendRequest: request?.id,
    });

    filterRequest(request?.id);
  };

  const handlerCancellationAddFriendWS = () => {
    SocketApi.socket?.emit('cancellation_add_friend', {
      idFriendRequest: request?.id,
    });

    filterRequest(request?.id);
  };

  return (
    <SItemRequest key={request.id}>
      <PhotoProfile size={60} img={request.sender.avatar} name={request.sender.name} />
      <SMainContent>
        <SName>{request.sender.name}</SName>
        <SButtons>
          <BaseButton height="30px" onClick={handlerFriendAcceptWS}>
            Принять предложение
          </BaseButton>
          <BaseButton height="30px" onClick={handlerCancellationAddFriendWS} bgTransparent>
            Отменить предложение
          </BaseButton>
        </SButtons>
      </SMainContent>
    </SItemRequest>
  );
};

export default ItemApplicationsFriends;
