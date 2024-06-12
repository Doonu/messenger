import SocketApi from '../socket-api';
import { useEffect } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { APIMessage } from '../../../models/IMessage';
import {
  APIUpdateMessage,
  APIDeleteMessage,
  APIDeleteFixedMessage,
  APIMessageRead,
  APIOutUserOfChat,
  APINewUsers,
  APINewNameChat,
} from 'pages/private/chat/model/IChat';
import {
  createFixedMessageCallback,
  createMessageCallback,
  deleteFixedMessageCallback,
  deleteMessageCallback,
  deleteUserOfChatCallback,
  messageReadCallback,
  updateMessageCallback,
  updateNameChatCallback,
  updateUsersInChatCallback,
} from 'pages/private/chat/lib/handlers.realTime';

import { IUseDialogSocket } from './dialog.type';

export const dialogHook = ({
  id,
  setMessages,
  setNewMessages,
  scrollTo,
  newMessagesRefState,
  setChoiceMessages,
  setFixedMessage,
  setEditedMessage,
  setChat,
  chatRefState,
  navigate,
  setInfoPlayers,
}: IUseDialogSocket) => {
  const user = useAppSelector(selectorProfile);

  const createdMessage = (data: APIMessage) => {
    createMessageCallback({
      data,
      setMessages,
      setNewMessages,
      scrollTo,
      id,
      ref: newMessagesRefState,
    });
  };

  const deletedMessage = (data: APIDeleteMessage) => {
    deleteMessageCallback({
      data,
      id,
      setMessages,
      setFixedMessage,
      setNewMessages,
      setChoiceMessages,
    });
  };

  const updateMessage = (data: APIUpdateMessage) => {
    updateMessageCallback({
      data,
      id,
      setFixedMessage,
      setMessages,
      setNewMessages,
      setChoiceMessages,
      setEditedMessage,
    });
  };

  const createdFixedMessage = (data: APIMessage) => {
    createFixedMessageCallback({
      data,
      id,
      setFixedMessage,
      setChoiceMessages,
    });
  };

  const deleteFixedMessage = (data: APIDeleteFixedMessage) => {
    deleteFixedMessageCallback({ setFixedMessage, setChoiceMessages, id, data });
  };

  const readMessage = (data: APIMessageRead) => {
    messageReadCallback({ setNewMessages, data, setChat, id });
  };

  const userOutOfChat = (data: APIOutUserOfChat) => {
    deleteUserOfChatCallback({
      id,
      userId: user.id,
      setChat,
      chatRefState,
      data,
      newMessagesRefState,
      setNewMessages,
      setMessages,
      navigate,
    });
  };

  const addNewUser = (data: APINewUsers) => {
    updateUsersInChatCallback({
      id,
      setChat,
      data,
      newMessagesRefState,
      setNewMessages,
      setMessages,
      setInfoPlayers,
    });
  };

  const newNameChat = (data: APINewNameChat) => {
    updateNameChatCallback({
      id,
      data,
      setChat,
      newMessagesRefState,
      setNewMessages,
      setMessages,
    });
  };

  const connectSocket = () => {
    SocketApi.socket?.on('new_message', createdMessage);
    SocketApi.socket?.on('remove_message', deletedMessage);
    SocketApi.socket?.on('edit_message', updateMessage);
    SocketApi.socket?.on('new_fixed_message', createdFixedMessage);
    SocketApi.socket?.on('remove_fixed_message', deleteFixedMessage);
    SocketApi.socket?.on('delivered_message', readMessage);
    SocketApi.socket?.on('delete_user_chat', userOutOfChat);
    SocketApi.socket?.on('add_new_user', addNewUser);
    SocketApi.socket?.on('new_dialogName', newNameChat);
  };

  useEffect(() => {
    if (user.id) connectSocket();

    return () => {
      SocketApi.socket?.off('new_message', createdMessage);
      SocketApi.socket?.off('remove_message', deletedMessage);
      SocketApi.socket?.off('edit_message', updateMessage);
      SocketApi.socket?.off('new_fixed_message', createdFixedMessage);
      SocketApi.socket?.off('remove_fixed_message', deleteFixedMessage);
      SocketApi.socket?.off('delivered_message', readMessage);
      SocketApi.socket?.off('delete_user_chat', userOutOfChat);
      SocketApi.socket?.off('add_new_user', addNewUser);
      SocketApi.socket?.off('new_dialogName', newNameChat);
    };
  }, [user.id]);
};
