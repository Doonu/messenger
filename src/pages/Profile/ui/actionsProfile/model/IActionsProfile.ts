import { IUser } from '@shared/models';
import { Dispatch, SetStateAction } from 'react';

export interface IActionsProfile {
  profilePage: IUser;
  profileFriends: IUser[];
  setProfileFriends: Dispatch<SetStateAction<IUser[]>>;
}
