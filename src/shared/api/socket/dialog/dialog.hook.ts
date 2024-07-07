import { useEffect } from 'react';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { APIMessage } from '@shared/models';
import {
  APIDeleteMessage,
  IUseDialogSocket,
  APIUpdateMessage,
  APIDeleteFixedMessage,
  APIMessageRead,
  APINewNameChat,
  APINewUsers,
  APIOutUserOfChat,
  SocketApi,
} from '@shared/api';

export const useDialogHook = ({
  deleteUserOutOfChat: deleteUserOutOfChatCallback,
  deleteFixedMessage: deleteFixedMessageCallback,
  createFixedMessage,
  readMessage: readMessageCallback,
  updateMessage: updateMessageCallback,
  deleteMessage,
  createMessage,
  addNewUser: addNewUserCallback,
  newNameChat: newNameChatCallback,
}: IUseDialogSocket) => {
  const user = useAppSelector(selectorProfile);

  const createdMessage = (data: APIMessage) => {
    if (createMessage) createMessage(data);
  };

  const deletedMessage = (data: APIDeleteMessage) => {
    if (deleteMessage) deleteMessage(data);
  };

  const updateMessage = (data: APIUpdateMessage) => {
    if (updateMessageCallback) updateMessageCallback(data);
  };

  const createdFixedMessage = (data: APIMessage) => {
    if (createFixedMessage) createFixedMessage(data);
  };

  const deleteFixedMessage = (data: APIDeleteFixedMessage) => {
    if (deleteFixedMessageCallback) deleteFixedMessageCallback(data);
  };

  const readMessage = (data: APIMessageRead) => {
    if (readMessageCallback) readMessageCallback(data);
  };

  const deleteUserOutOfChat = (data: APIOutUserOfChat) => {
    if (deleteUserOutOfChatCallback) deleteUserOutOfChatCallback(data);
  };

  const addNewUser = (data: APINewUsers) => {
    if (addNewUserCallback) addNewUserCallback(data);
  };

  const newNameChat = (data: APINewNameChat) => {
    if (newNameChatCallback) newNameChatCallback(data);
  };

  const connectSocket = () => {
    SocketApi.socket?.on('new_message', createdMessage);
    SocketApi.socket?.on('remove_message', deletedMessage);
    SocketApi.socket?.on('edit_message', updateMessage);
    SocketApi.socket?.on('new_fixed_message', createdFixedMessage);
    SocketApi.socket?.on('remove_fixed_message', deleteFixedMessage);
    SocketApi.socket?.on('delivered_message', readMessage);
    SocketApi.socket?.on('delete_user_chat', deleteUserOutOfChat);
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
      SocketApi.socket?.off('delete_user_chat', deleteUserOutOfChat);
      SocketApi.socket?.off('add_new_user', addNewUser);
      SocketApi.socket?.off('new_dialogName', newNameChat);
    };
  }, [user.id]);
};
