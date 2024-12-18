import { IUserExcept } from '@shared/models';

export type IUserType = 'friend' | 'notFriend';

export interface IFriend {
  user: IUserExcept;
  type: IUserType;
  isBorderFirst?: boolean;
}
