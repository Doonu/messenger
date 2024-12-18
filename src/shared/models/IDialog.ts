import { ApiProfile, IUser } from './IUser';
import { APIMessage, IMessage } from './IMessage';

export interface IDialog {
  id: number;
  dialogName: string;
  imgSubstitute: string;
  participants: IUser[];
  updatedAt: string;
  createdAt: string;
  isGroup: boolean;
  countNotReadMessages: number;
  readStatusLastMessage: boolean;
  lastMessage: IMessage | null;
}

export interface IDialogChat extends Omit<IDialog, 'lastMessage' | 'readStatusLastMessage'> {
  fixedMessage: IMessage | null;
}

export interface APIDialog {
  id: number;
  imgSubstitute: string;
  dialogName: string;
  participants: ApiProfile[];
  updatedAt: string;
  createdAt: string;
  isGroup: boolean;
  countNotReadMessages: number;
  readStatusLastMessage: boolean;
  lastMessage: APIMessage | null;
}

export interface APIDialogChat extends Omit<APIDialog, 'lastMessage' | 'readStatusLastMessage'> {
  fixedMessage: APIMessage | null;
}

export interface IMessageItem {
  id: number;
  content: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  readStatus: boolean;
  status: 'main' | 'info';
}

export interface IChat {
  id: string;
  author: IUser | null;
  createdAt: string | null;
  dialogId: number;
  messages: IMessageItem[];
}
