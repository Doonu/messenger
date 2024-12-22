import { IGetFriendRequest, IUser } from '@entities/friends';

export interface IMainPageProfile {
  user: IUser;
  statusFriendRequest: IGetFriendRequest;
  friendRequest: () => void;
  handlerCheckFriend: () => boolean;
  handlerFriendRequestAccepted: () => void;
  handlerDeleteFriend: () => void;
  handlerCancelAddFriend: () => void;
  handlerCancelFriendRequest: () => void;
  handlerWriteMessage: () => void;
}
