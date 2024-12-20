import { Dispatch, SetStateAction } from 'react';
import { IUser } from '@entities/friends';

export interface IActionsProfile {
  profilePage: IUser;
  profileFriends: IUser[];
  setProfileFriends: Dispatch<SetStateAction<IUser[]>>;
}
