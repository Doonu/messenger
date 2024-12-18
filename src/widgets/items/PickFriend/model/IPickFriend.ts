import { IUser, IUserExcept } from '@shared/models';

export interface IPickFriend {
  user: IUserExcept;
  usersPick: IUser[];
  pickUser: (user: IUser) => void;
}
