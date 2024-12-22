import { IUser, IUserExcept } from '@entities/friends';

export interface IPickFriend {
  user: IUserExcept;
  usersPick: IUser[];
  pickUser: (user: IUser) => void;
}
