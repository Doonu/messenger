import { IUser } from 'shared/models/IUser';

export interface IMessageItem {
  id: number;
  content: string[];
  createdAt: number;
  updatedAt: number;
  userId: number;
}

export interface IChat {
  author: IUser;
  createdAt: number;
  dialogId: number;
  messages: IMessageItem[];
}

export interface IDeleted {
  messagesId: number[];
  dialogId: number;
}

export interface IUpdate {
  dialogId: number;
  id: number;
  content: string[];
}
