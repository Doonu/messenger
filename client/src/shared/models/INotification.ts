import { ReactNode } from 'react';
import { ApiProfile, IUser } from './IUser';

export type Types = 'error' | 'warning' | 'info' | 'success' | undefined;
export type Levels = 'low' | 'medium' | 'height' | undefined;

export interface INotifyItem {
  id: number;
  content: string;
  createdAt: string;
  sender: Omit<IUser, 'roles'>;
}

export interface INotification {
  message: {
    title: ReactNode;
    type: Types;
    level?: Levels;
  };
  count: number;
  notifications: INotifyItem[];
  loading: boolean;
  error: boolean;
  page: number;
  limit: number;
  haseMore: boolean;
}

export interface APINotifyItem {
  id: number;
  content: string;
  createdAt: string;
  sender: ApiProfile;
}
