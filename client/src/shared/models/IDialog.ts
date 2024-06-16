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
  fixedMessage: APIMessage | null;
  countNotReadMessages: number;
  readStatusLastMessage: boolean;
  lastMessage: APIMessage | null;
}

export interface APIDialogChat extends Omit<APIDialog, 'lastMessage' | 'readStatusLastMessage'> {
  fixedMessage: APIMessage | null;
}
