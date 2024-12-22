import { IUserExcept } from '@entities/friends';

export interface IAllUsers {
  users: IUserExcept[];
  loading: boolean;
  haseMore: boolean;
  handlerNextPage: () => Promise<void>;
}
