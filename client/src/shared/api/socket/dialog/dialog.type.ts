import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { IChat } from 'pages/private/chat/model/IChat';
import { IMessage } from '../../../models/IMessage';
import { IDialogChat } from '../../../models/IDialog';
import { NavigateFunction } from 'react-router-dom';

export interface IUseDialogSocket {
  id: number;
  setNewMessages: Dispatch<SetStateAction<IChat[]>>;
  setMessages: Dispatch<SetStateAction<IChat[]>>;
  scrollTo: (
    block: ScrollIntoViewOptions['block'],
    behavior?: ScrollIntoViewOptions['behavior']
  ) => void;
  newMessagesRefState: MutableRefObject<IChat[]>;
  setChoiceMessages: Dispatch<SetStateAction<number[]>>;
  setFixedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
  setEditedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
  setChat: Dispatch<SetStateAction<IDialogChat | null>>;
  navigate: NavigateFunction;
  chatRefState: MutableRefObject<IDialogChat | null>;
  setInfoPlayers: Dispatch<SetStateAction<boolean>>;
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
