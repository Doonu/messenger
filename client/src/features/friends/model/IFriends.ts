import { IUser } from '@shared/models';

export interface IFriends {
  friends: IUser[];
  title: string;
  isOnlineFriends?: boolean;
}

export interface IListFriends {
  title: string;
  users: IUser[];
  isBorder?: boolean;
}
