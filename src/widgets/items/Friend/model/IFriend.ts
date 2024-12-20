import { IUserExcept } from '@entities/friends';

export type IUserType = 'friend' | 'notFriend';

export interface IFriend {
  user: IUserExcept;
  type: IUserType;
  isBorderFirst?: boolean;
}
