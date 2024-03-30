import { IAllFriendRequests } from 'shared/models/IFriendRequest';

export interface IItemApplicationsFriends {
  request: IAllFriendRequests;
  filterRequest: (id: number) => void;
}
