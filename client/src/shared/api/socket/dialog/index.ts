import { SocketApi } from '../../index';
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
    content: content,
    dialogId: dialogId,
    userId: userId,
  });
};

export const deleteMessage = ({ messagesId, dialogId, userId }: IDeleteMessage) => {
  SocketApi.socket?.emit('delete_messages', {
    messagesId: messagesId,
    userId: userId,
    dialogId: dialogId,
  });
};

export const updateMessage = ({ content, dialogId, userId, id }: IUpdateMessage) => {
  SocketApi.socket?.emit('update_message', {
    content: content,
    dialogId: dialogId,
    userId: userId,
    id: id,
  });
};

export const createFixedMessage = ({ messageId, dialogId, userId }: ICreateFixedMessage) => {
  SocketApi.socket?.emit('create_fixed_message', {
    dialogId: dialogId,
    messageId: messageId,
    userId: userId,
  });
};

export const deleteFixedMessage = ({ dialogId, userId }: IDeleteFixedMessage) => {
  SocketApi.socket?.emit('delete_fixed_message', {
    dialogId: dialogId,
    userId: userId,
  });
};

export const readMessage = ({ messageId, dialogId, userId }: IReadMessage) => {
  SocketApi.socket?.emit('read_message', {
    dialogId: dialogId,
    userId: userId,
    messageId: messageId,
  });
};

export const userOutOfChat = ({ dialogId, participant }: IOutUserOfChat) => {
  SocketApi.socket?.emit('user_out_chat', {
    dialogId: dialogId,
    participant: participant,
  });
};

export const updateNameChat = ({ dialogName, dialogId, userId }: IUpdateNameChat) => {
  SocketApi.socket?.emit('update_dialogName', {
    dialogName: dialogName,
    dialogId: dialogId,
    userId: userId,
  });
};

export const addNewUsers = ({ userId, participants, dialogId }: IAddNewUsers) => {
  SocketApi.socket?.emit('user_add_chat', {
    participants: participants,
    userId: userId,
    dialogId: dialogId,
  });
};
