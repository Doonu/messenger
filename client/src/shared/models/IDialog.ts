import { ApiProfile, IUser } from './IUser';
import { APIMessage, IMessage } from './IMessage';

export interface IDialog {
  id: number;
  dialogName: string;
  imgSubstitute: string;
  participants: IUser[];
  updatedAt: string;
  isGroup: boolean;
  countNotReadMessages: number;
}

export interface IChat extends IDialog {
  fixedMessage: IMessage | null;
}

export interface APIDialog {
  id: number;
  imgSubstitute: string;
  dialogName: string;
  participants: ApiProfile[];
  updatedAt: string;
  isGroup: boolean;
  fixedMessage: APIMessage | null;
  countNotReadMessages: number;
}

export interface APIChat extends APIDialog {
  fixedMessage: APIMessage | null;
}
