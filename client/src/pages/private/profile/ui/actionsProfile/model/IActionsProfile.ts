import { IUser } from 'shared/models/IUser';
import { Dispatch, SetStateAction } from 'react';

export interface IActionsProfile {
  profilePage: IUser;
  profileFriends: IUser[];
  setProfileFriends: Dispatch<SetStateAction<IUser[]>>;
}
