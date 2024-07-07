import { IUser, IGetFriendRequest } from '@shared/models';

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
