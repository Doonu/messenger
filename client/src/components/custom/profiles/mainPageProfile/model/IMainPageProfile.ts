import { IUser } from '../../../../../shared/models/IUser';
import { IGetFriendRequest } from '../../../../../shared/api/http/user/getFriendRequest';

export interface IMainPageProfile {
  user: IUser;
  statusFriendRequest: IGetFriendRequest;
  friendRequest: () => void;
  handlerCheckFriend: () => boolean;
  handlerFriendRequestAccepted: () => void;
}
