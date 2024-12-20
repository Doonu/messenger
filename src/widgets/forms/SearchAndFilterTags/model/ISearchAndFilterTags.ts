import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IUser } from '@entities/friends';

export interface ISearchAndFilterTags {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handlerSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  picks: IUser[];
  setUsersPick: Dispatch<SetStateAction<IUser[]>>;
}
