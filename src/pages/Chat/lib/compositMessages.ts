import { v4 as uuidv4 } from 'uuid';
import { IChat, IMessage, IMessageItem } from '@entities/dialogs';

export const compositionRevert = (initialMessages: IChat[]): IMessage[] => {
  const currentMessages: IMessage[] = [];

  initialMessages.forEach(({ messages, author, dialogId }) => {
    messages.forEach((el) => {
      currentMessages.push({
        id: el.id,
        content: el.content,
        dialogId,
        userId: el.userId,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        author,
        readStatus: el.readStatus,
        status: el.status,
      });
    });
  });

  return currentMessages;
};

// TODO: Если прошло больше 10 минут от прошлого сообщения,
//  одного и того же пользователя то создавать новый массив
export const compositionMessages = (messages: IMessage[]): IChat[] => {
  const currentMessages: IChat[] = [];

  messages.forEach((el) => {
    const newMessage: IMessageItem = {
      id: el.id,
      content: el.content,
      userId: el.userId,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
      readStatus: el.readStatus,
      status: el.status,
    };

    if (newMessage.status === 'info') {
      currentMessages.push({
        id: uuidv4(),
        author: null,
        createdAt: null,
        dialogId: el.dialogId,
        messages: [newMessage],
      });
    }

    const currentMessageAuthorId = currentMessages?.[currentMessages.length - 1]?.author?.id;

    if (currentMessageAuthorId === el?.author?.id && newMessage.status === 'main') {
      currentMessages[currentMessages.length - 1].messages.push(newMessage);
    }

    if (currentMessageAuthorId !== el?.author?.id && newMessage.status === 'main') {
      currentMessages.push({
        id: uuidv4(),
        author: el.author,
        createdAt: el.createdAt,
        dialogId: el.dialogId,
        messages: [newMessage],
      });
    }
  });

  return currentMessages;
};

export const addInCompositionMessages = (message: IMessage, messages: IChat[]): IChat[] => {
  const newMessage: IMessageItem = {
    id: message.id,
    content: message.content,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    userId: message.userId,
    readStatus: message.readStatus,
    status: message.status,
  };
  const result: IChat[] = [...messages];

  if (newMessage.status === 'info') {
    result.push({
      id: uuidv4(),
      author: null,
      createdAt: null,
      dialogId: message.dialogId,
      messages: [newMessage],
    });
  }

  if (
    messages?.[messages.length - 1]?.author?.id === message?.author?.id &&
    newMessage.status === 'main'
  ) {
    result?.[result.length - 1].messages.push(newMessage);
  }

  if (
    messages?.[messages.length - 1]?.author?.id !== message?.author?.id &&
    newMessage.status === 'main'
  ) {
    result.push({
      id: uuidv4(),
      author: message?.author,
      createdAt: message.createdAt,
      messages: [newMessage],
      dialogId: message.dialogId,
    });
  }

  return result;
};

export const deleteInCompositionMessages = (ids: number[], messages: IChat[]) => {
  return messages
    .map((el) => ({
      ...el,
      messages: el.messages.filter((message) => !ids.includes(message.id)),
    }))
    .filter((el) => el.messages.length);
};

export const updateInCompositionMessages = (id: number, content: string[], messages: IChat[]) => {
  return messages.map((el) => ({
    ...el,
    messages: el.messages.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          content,
        };
      }
      return message;
    }),
  }));
};

export const updateStatusRead = (messageId: number, messages: IChat[]) => {
  return messages.map((el) => ({
    ...el,
    messages: el.messages.map((message) => {
      if (message.id === messageId) {
        return {
          ...message,
          readStatus: true,
        };
      }
      return message;
    }),
  }));
};
