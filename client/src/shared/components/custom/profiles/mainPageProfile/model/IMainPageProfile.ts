import { IUser } from 'shared/models/IUser';
import { IGetFriendRequest } from 'shared/models/IUser';

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
