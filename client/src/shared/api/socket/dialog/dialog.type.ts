import { APIMessage } from '../../../models/IMessage';
import {
  APIDeleteFixedMessage,
  APIDeleteMessage,
  APIMessageRead,
  APINewNameChat,
  APINewUsers,
  APIOutUserOfChat,
  APIUpdateMessage,
} from 'pages/private/chat/model/IChat';

export interface IUseDialogSocket {
  createMessage?: (data: APIMessage) => void;
  deleteMessage?: (data: APIDeleteMessage) => void;
  updateMessage?: (data: APIUpdateMessage) => void;
  createFixedMessage?: (data: APIMessage) => void;
  deleteFixedMessage?: (data: APIDeleteFixedMessage) => void;
  readMessage?: (data: APIMessageRead) => void;
  deleteUserOutOfChat?: (data: APIOutUserOfChat) => void;
  addNewUser?: (data: APINewUsers) => void;
  newNameChat?: (data: APINewNameChat) => void;
}

export interface ICreateMessage {
  content: string[];
  dialogId?: number;
  userId: number;
}

export interface IReadMessage {
  userId: number;
  messageId: number;
  dialogId: number;
}

export interface IDeleteMessage {
  messagesId: number[];
  dialogId?: number;
  userId: number;
}

export interface IUpdateMessage {
  content: string[];
  dialogId?: number;
  userId: number;
  id: number;
}

export interface ICreateFixedMessage {
  messageId: number;
  userId: number;
  dialogId?: number;
}

export interface IDeleteFixedMessage {
  dialogId?: number;
  userId: number;
}

export interface IOutUserOfChat {
  dialogId: number;
  participant: number;
}

export interface IUpdateNameChat {
  dialogId: number;
  userId: number;
  dialogName: string;
}

export interface IAddNewUsers {
  participants: number[];
  userId: number;
  dialogId: number;
}
