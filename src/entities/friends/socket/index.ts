import { SocketApi } from '@shared/api';

import { IHandlerFriendRequestWS, IBaseFriendReq } from './friendRequest.type';

// Добавление в друзья
export const friendRequest = ({ to, from }: IHandlerFriendRequestWS) => {
  SocketApi.socket?.emit('friend_request', {
    to,
    from,
  });
};

// Принять предложение
export const friendAccept = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('accept_friend_request', {
    idFriendRequest,
  });
};

// Отменить добавление в друзья
export const cancellationAddFriend = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('cancellation_add_friend', {
    idFriendRequest,
  });
};

// Отменить предложение
export const canselFriendReq = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('cancellation_friend_request', {
    idFriendRequest,
  });
};
export * from './friendRequest.converting';
export * from './friendRequest.type';
