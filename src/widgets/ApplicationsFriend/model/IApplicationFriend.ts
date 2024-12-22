import { IAllFriendRequests } from '@entities/friends';

export interface IItemApplicationsFriends {
  request: IAllFriendRequests;
  filterRequest: (id: number) => void;
}
