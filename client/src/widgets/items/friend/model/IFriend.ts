import { IUserExcept } from '../../../../shared/api/http/user/getUsersExceptFriends';

export type IUserType = 'friend' | 'notFriend';

export interface IFriend {
  user: IUserExcept;
  type: IUserType;
  isBorderFirst?: boolean;
}
