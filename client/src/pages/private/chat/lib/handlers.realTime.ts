import {
  ICreateFixedMessageCallback,
  ICreateMessageCallback,
  IDeleteFixedMessageCallback,
  IDeleteMessageCallback,
  IDeleteUserOfChatCallback,
  IMessageReadCallback,
  IUpdateMessageCallback,
  IUpdateNameChatCallback,
  IUpdateUsersInChatCallback,
} from '../model/IMessageCallback';
import { messageConverting, userArrayConverting } from 'shared/api/converteitions';
import {
  addInCompositionMessages,
  deleteInCompositionMessages,
  updateInCompositionMessages,
  updateStatusRead,
} from './compositMessages';

export const createMessageCallback = ({
  id,
  data,
  ref,
  scrollTo,
  setNewMessages,
  setMessages,
}: ICreateMessageCallback) => {
  if (id && data.dialogId === id) {
    const convertingData = messageConverting(data);

    if (ref.current.length) {
      setNewMessages((prev) => addInCompositionMessages(convertingData, prev));
    } else {
      setMessages((prev) => addInCompositionMessages(convertingData, prev));
    }

    scrollTo('start', 'smooth');
  }
};

export const deleteMessageCallback = ({
  data,
  id,
  setNewMessages,
  setMessages,
  setFixedMessage,
  setChoiceMessages,
}: IDeleteMessageCallback) => {
  if (id && data.dialogId === id) {
    setMessages((prev) => deleteInCompositionMessages(data.messagesId, prev));
    setNewMessages((prev) => deleteInCompositionMessages(data.messagesId, prev));
    setChoiceMessages([]);
    if (data.isFixedDeleteMessage) setFixedMessage(null);
  }
};

export const updateMessageCallback = ({
  setFixedMessage,
  setChoiceMessages,
  setMessages,
  setNewMessages,
  setEditedMessage,
  data,
  id,
}: IUpdateMessageCallback) => {
  if (id && data.dialogId === id) {
    setMessages((prev) => updateInCompositionMessages(data.id, data.content, prev));
    setNewMessages((prev) => updateInCompositionMessages(data.id, data.content, prev));
    setChoiceMessages([]);
    setEditedMessage(null);
    if (data.updateFixedMessage) setFixedMessage(messageConverting(data.updateFixedMessage));
  }
};

export const createFixedMessageCallback = ({
  setChoiceMessages,
  setFixedMessage,
  data,
  id,
}: ICreateFixedMessageCallback) => {
  if (id && data.dialogId === id) {
    const convertingData = messageConverting(data);
    setFixedMessage(convertingData);
    setChoiceMessages([]);
  }
};

export const deleteFixedMessageCallback = ({
  setChoiceMessages,
  setFixedMessage,
  id,
  data,
}: IDeleteFixedMessageCallback) => {
  if (id && data.dialogId === id) {
    setFixedMessage(null);
    setChoiceMessages([]);
  }
};

export const messageReadCallback = ({
  setNewMessages,
  id,
  setChat,
  data,
}: IMessageReadCallback) => {
  if (id && data.dialogId === id) {
    setNewMessages((prev) => updateStatusRead(data.messageId, prev));
    setChat(
      (prev) =>
        prev && {
          ...prev,
          countNotReadMessages: prev.countNotReadMessages === 0 ? 0 : prev.countNotReadMessages - 1,
        }
    );
  }
};

export const deleteUserOfChatCallback = ({
  id,
  data,
  setNewMessages,
  setMessages,
  navigate,
  userId,
  chatRefState,
  setChat,
  newMessagesRefState,
}: IDeleteUserOfChatCallback) => {
  if (id && data.dialogId === id) {
    if (data.participant === userId) {
      navigate(`/dialog`);
    }

    const filterParticipants = chatRefState.current?.participants.filter(
      (el) => el.id !== data.participant
    );

    filterParticipants &&
      setChat(
        (prev) =>
          prev && {
            ...prev,
            participants: filterParticipants,
          }
      );
    const convertingData = messageConverting(data.message);

    if (newMessagesRefState.current.length) {
      setNewMessages((prev) => addInCompositionMessages(convertingData, prev));
    } else {
      setMessages((prev) => addInCompositionMessages(convertingData, prev));
    }
  }
};

export const updateUsersInChatCallback = ({
  id,
  data,
  setChat,
  setNewMessages,
  setMessages,
  setInfoPlayers,
  newMessagesRefState,
}: IUpdateUsersInChatCallback) => {
  if (id && data.dialogId === id) {
    setInfoPlayers(false);
    setChat(
      (prev) =>
        prev && {
          ...prev,
          participants: [...prev.participants, ...userArrayConverting(data.participants)],
        }
    );

    data.messages.forEach((el) => {
      const convertingData = messageConverting(el);

      if (newMessagesRefState.current.length) {
        setNewMessages((prev) => addInCompositionMessages(convertingData, prev));
      } else {
        setMessages((prev) => addInCompositionMessages(convertingData, prev));
      }
    });
  }
};

export const updateNameChatCallback = ({
  setChat,
  data,
  setNewMessages,
  setMessages,
  id,
  newMessagesRefState,
}: IUpdateNameChatCallback) => {
  if (id && data.dialogId === id) {
    setChat((prev) => prev && { ...prev, dialogName: data.dialogName });

    const convertingData = messageConverting(data.message);

    if (newMessagesRefState.current.length) {
      setNewMessages((prev) => addInCompositionMessages(convertingData, prev));
    } else {
      setMessages((prev) => addInCompositionMessages(convertingData, prev));
    }
  }
};
