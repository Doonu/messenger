import SocketApi from '../socket-api';
import { IBaseFriendReq, IHandlerFriendRequestWS } from './friendRequest.type';

// Добавление в друзья
export const friendRequestWS = ({ to, from }: IHandlerFriendRequestWS) => {
  SocketApi.socket?.emit('friend_request', {
    to: to,
    from: from,
  });
};

// Принять предложение
export const friendAcceptWS = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('accept_friend_request', {
    idFriendRequest: idFriendRequest,
  });
};

// Отменить добавление в друзья
export const cancellationAddFriendWS = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('cancellation_add_friend', {
    idFriendRequest: idFriendRequest,
  });
};

// Отменить предложение
export const canselFriendReqWS = ({ idFriendRequest }: IBaseFriendReq) => {
  SocketApi.socket?.emit('cancellation_friend_request', {
    idFriendRequest: idFriendRequest,
  });
};
