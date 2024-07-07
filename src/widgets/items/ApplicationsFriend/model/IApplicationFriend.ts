import { IAllFriendRequests } from '@shared/models';

export interface IItemApplicationsFriends {
  request: IAllFriendRequests;
  filterRequest: (id: number) => void;
}
