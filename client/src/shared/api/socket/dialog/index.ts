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
  SocketApi,
} from '@shared/api';

import {
  SocketAddNewUsers,
  SocketCreateFixedMessage,
  SocketCreateMessage,
  SocketDeleteFixedMessage,
  SocketDeleteMessage,
  SocketOutUserOfChat,
  SocketReadMessage,
  SocketUpdateMessage,
  SocketUpdateNameChat,
} from './dialog.socket.type';

export const createMessage = ({ content, dialogId, userId }: ICreateMessage) => {
  const socketCustom: SocketCreateMessage | null = SocketApi.socket;

  socketCustom?.emit('create_message', {
    content,
    dialogId,
    userId,
  });
};

export const deleteMessage = ({ messagesId, dialogId, userId }: IDeleteMessage) => {
  const socketCustom: SocketDeleteMessage | null = SocketApi.socket;

  socketCustom?.emit('delete_messages', {
    messagesId,
    userId,
    dialogId,
  });
};

export const updateMessage = ({ content, dialogId, userId, id }: IUpdateMessage) => {
  const socketCustom: SocketUpdateMessage | null = SocketApi.socket;

  socketCustom?.emit('update_message', {
    content,
    dialogId,
    userId,
    id,
  });
};

export const createFixedMessage = ({ messageId, dialogId, userId }: ICreateFixedMessage) => {
  const socketCustom: SocketCreateFixedMessage | null = SocketApi.socket;

  socketCustom?.emit('create_fixed_message', {
    dialogId,
    messageId,
    userId,
  });
};

export const deleteFixedMessage = ({ dialogId, userId }: IDeleteFixedMessage) => {
  const socketCustom: SocketDeleteFixedMessage | null = SocketApi.socket;

  socketCustom?.emit('delete_fixed_message', {
    dialogId,
    userId,
  });
};

export const readMessage = ({ messageId, dialogId, userId }: IReadMessage) => {
  const socketCustom: SocketReadMessage | null = SocketApi.socket;

  socketCustom?.emit('read_message', {
    dialogId,
    userId,
    messageId,
  });
};

export const userOutOfChat = ({ dialogId, participant }: IOutUserOfChat) => {
  const socketCustom: SocketOutUserOfChat | null = SocketApi.socket;

  socketCustom?.emit('read_message', {
    dialogId,
    participant,
  });
};

export const updateNameChat = ({ dialogName, dialogId, userId }: IUpdateNameChat) => {
  const socketCustom: SocketUpdateNameChat | null = SocketApi.socket;

  socketCustom?.emit('update_dialogName', {
    dialogName,
    dialogId,
    userId,
  });
};

export const addNewUsers = ({ userId, participants, dialogId }: IAddNewUsers) => {
  const socketCustom: SocketAddNewUsers | null = SocketApi.socket;

  socketCustom?.emit('user_add_chat', {
    participants,
    userId,
    dialogId,
  });
};

export * from './dialog.type';
export * from './dialog.hook';
