import { SocketApi } from '../../index';

interface ICreateMessage {
  content: string[];
  dialogId?: number;
  userId: number;
}

interface IReadMessage {
  userId: number;
  messageId: number;
  dialogId: number;
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
  userId: number;
  dialogId?: number;
}

interface IDeleteFixedMessage {
  dialogId?: number;
  userId: number;
}

interface IOutUserOfChat {
  dialogId: number;
  participant: number;
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
