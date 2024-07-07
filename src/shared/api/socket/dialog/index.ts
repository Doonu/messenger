import { SocketApi } from '../socket-api';
import {
  ICreateMessage,
  ICreateFixedMessage,
  IDeleteFixedMessage,
  IDeleteMessage,
  IReadMessage,
  IUpdateMessage,
  IUpdateNameChat,
  IOutUserOfChat,
  IAddNewUsers,
} from './dialog.type';

export const createMessage = ({ content, dialogId, userId }: ICreateMessage) => {
  SocketApi.socket?.emit('create_message', {
    content,
    dialogId,
    userId,
  });
};

export const deleteMessage = ({ messagesId, dialogId, userId }: IDeleteMessage) => {
  SocketApi.socket?.emit('delete_messages', {
    messagesId,
    userId,
    dialogId,
  });
};

export const updateMessage = ({ content, dialogId, userId, id }: IUpdateMessage) => {
  SocketApi.socket?.emit('update_message', {
    content,
    dialogId,
    userId,
    id,
  });
};

export const createFixedMessage = ({ messageId, dialogId, userId }: ICreateFixedMessage) => {
  SocketApi.socket?.emit('create_fixed_message', {
    dialogId,
    messageId,
    userId,
  });
};

export const deleteFixedMessage = ({ dialogId, userId }: IDeleteFixedMessage) => {
  SocketApi.socket?.emit('delete_fixed_message', {
    dialogId,
    userId,
  });
};

export const readMessage = ({ messageId, dialogId, userId }: IReadMessage) => {
  SocketApi.socket?.emit('read_message', {
    dialogId,
    userId,
    messageId,
  });
};

export const userOutOfChat = ({ dialogId, participant }: IOutUserOfChat) => {
  SocketApi.socket?.emit('user_out_chat', {
    dialogId,
    participant,
  });
};

export const updateNameChat = ({ dialogName, dialogId, userId }: IUpdateNameChat) => {
  SocketApi.socket?.emit('update_dialogName', {
    dialogName,
    dialogId,
    userId,
  });
};

export const addNewUsers = ({ userId, participants, dialogId }: IAddNewUsers) => {
  SocketApi.socket?.emit('user_add_chat', {
    participants,
    userId,
    dialogId,
  });
};
export * from './dialog.type';
export * from './dialog.hook';
