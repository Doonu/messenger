import { ApiProfile, IUser } from 'shared/models/IUser';
import { APIMessage } from '../../../../shared/models/IMessage';

export interface IMessageItem {
  id: number;
  content: string[];
  createdAt: number;
  updatedAt: number;
  userId: number;
  readStatus: boolean;
  status: 'main' | 'info';
}

export interface IChat {
  id: string;
  author: IUser | null;
  createdAt: number | null;
  dialogId: number;
  messages: IMessageItem[];
}

export interface APIDeleteMessage {
  messagesId: number[];
  dialogId: number;
  isFixedDeleteMessage: boolean;
}

export interface APIUpdateMessage {
  dialogId: number;
  id: number;
  content: string[];
  updateFixedMessage: APIMessage;
}

export interface APIDeleteFixedMessage {
  dialogId: number;
}

export interface APIMessageRead {
  dialogId: number;
  messageId: number;
}

export interface APIOutUserOfChat {
  dialogId: number;
  message: APIMessage;
  participant: number;
}

export interface APINewUsers {
  dialogId: number;
  messages: APIMessage[];
  participants: ApiProfile[];
}

export interface APINewNameChat {
  dialogId: number;
  message: APIMessage;
  dialogName: string;
}
