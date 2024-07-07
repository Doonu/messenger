import { ApiProfile, IUser } from './IUser';

export interface APIAllFriendRequests {
  id: number;
  createdAt: number;
  sender: ApiProfile;
}

export interface IAllFriendRequests {
  id: number;
  createdAt: number;
  sender: IUser;
}
