import { SocketApi } from '../../index';

interface ICreateMessage {
  content: string[];
  dialogId?: number;
  userId: number;
}

interface IDeleteMessage {
  messagesId: number[];
  dialogId?: number;
  userId: number;
}

interface IUpdateMessage {
  content: string[];
  dialogId?: number;
  userId: number;
  id: number;
}

interface ICreateFixedMessage {
  messageId: number;
  dialogId?: number;
}

interface IDeleteFixedMessage {
  dialogId?: number;
}

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

export const createFixedMessage = ({ messageId, dialogId }: ICreateFixedMessage) => {
  SocketApi.socket?.emit('create_fixed_message', {
    dialogId: dialogId,
    messageId: messageId,
  });
};

export const deleteFixedMessage = ({ dialogId }: IDeleteFixedMessage) => {
  SocketApi.socket?.emit('delete_fixed_message', {
    dialogId: dialogId,
  });
};
