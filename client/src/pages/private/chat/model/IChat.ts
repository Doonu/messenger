import { IUser } from 'shared/models/IUser';
import { APIMessage } from '../../../../shared/models/IMessage';

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
