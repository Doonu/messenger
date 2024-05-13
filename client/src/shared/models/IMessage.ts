import { ApiProfile, IUser } from './IUser';

export interface IMessage {
  id: number;
  content: string[];
  dialogId: number;
  userId: number;
  createdAt: number;
  updatedAt: number;
  author: IUser | null;
  readStatus: boolean;
  status: 'main' | 'info';
}

export interface APIMessage {
  id: number;
  content: string[];
  dialogId: number;
  userId: number;
  createdAt: number;
  updatedAt: number;
  author: ApiProfile;
  readStatus: boolean;
  status: 'main' | 'info';
}
