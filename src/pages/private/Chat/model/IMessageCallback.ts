import { APIMessage, IMessage, IDialogChat, IChat } from '@shared/models';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
  APIDeleteFixedMessage,
  APIDeleteMessage,
  APIMessageRead,
  APINewNameChat,
  APINewUsers,
  APIOutUserOfChat,
  APIUpdateMessage,
} from '@shared/api';

interface IMessageCallback {
  id: number;
  setNewMessages: Dispatch<SetStateAction<IChat[]>>;
  setMessages: Dispatch<SetStateAction<IChat[]>>;
}

export interface ICreateMessageCallback extends IMessageCallback {
  data: APIMessage;
  ref: MutableRefObject<IChat[]>;
  scrollTo: (
    block: ScrollIntoViewOptions['block'],
    behavior?: ScrollIntoViewOptions['behavior']
  ) => void;
}

export interface IDeleteMessageCallback extends IMessageCallback {
  data: APIDeleteMessage;
  id: number;
  setChoiceMessages: Dispatch<SetStateAction<number[]>>;
  setFixedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
}

export interface IUpdateMessageCallback extends IMessageCallback {
  data: APIUpdateMessage;
  setChoiceMessages: Dispatch<SetStateAction<number[]>>;
  setEditedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
  setFixedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
}

export interface ICreateFixedMessageCallback {
  id: number;
  data: APIMessage;
  setChoiceMessages: Dispatch<SetStateAction<number[]>>;
  setFixedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
}

export interface IDeleteFixedMessageCallback {
  id: number;
  data: APIDeleteFixedMessage;
  setFixedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
  setChoiceMessages: Dispatch<SetStateAction<number[]>>;
}

export interface IMessageReadCallback {
  id: number;
  data: APIMessageRead;
  setNewMessages: Dispatch<SetStateAction<IChat[]>>;
  setChat: Dispatch<SetStateAction<IDialogChat | null>>;
}

export interface IDeleteUserOfChatCallback extends IMessageCallback {
  data: APIOutUserOfChat;
  navigate: NavigateFunction;
  userId: number;
  setChat: Dispatch<SetStateAction<IDialogChat | null>>;
  chatRefState: MutableRefObject<IDialogChat | null>;
  newMessagesRefState: MutableRefObject<IChat[]>;
}

export interface IUpdateUsersInChatCallback extends IMessageCallback {
  data: APINewUsers;
  setInfoPlayers: Dispatch<SetStateAction<boolean>>;
  setChat: Dispatch<SetStateAction<IDialogChat | null>>;
  newMessagesRefState: MutableRefObject<IChat[]>;
}

export interface IUpdateNameChatCallback extends IMessageCallback {
  data: APINewNameChat;
  setChat: Dispatch<SetStateAction<IDialogChat | null>>;
  newMessagesRefState: MutableRefObject<IChat[]>;
}
