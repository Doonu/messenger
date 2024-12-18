import { IBaseFriendReq, IHandlerFriendRequestWS, SocketApi } from '@shared/api';

// Добавление в друзья
export const friendRequestWS = ({ to, from }: IHandlerFriendRequestWS) => {
  SocketApi.socket?.emit('friend_request', {
    to,
    from,
  });
};

// Принять предложение
export const friendAcceptWS = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('accept_friend_request', {
    idFriendRequest,
  });
};

// Отменить добавление в друзья
export const cancellationAddFriendWS = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('cancellation_add_friend', {
    idFriendRequest,
  });
};

// Отменить предложение
export const canselFriendReqWS = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('cancellation_friend_request', {
    idFriendRequest,
  });
};
export * from './friendRequest.converting';
export * from './friendRequest.hook';
export * from './friendRequest.type';
