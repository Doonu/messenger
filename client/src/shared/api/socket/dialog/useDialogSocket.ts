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
} from 'pages/private/chat/model/IChat';

interface IUseDialogSocket {
  createMessageCallback?: (data: APIMessage) => void;
  deleteMessageCallback?: (data: APIDeleteMessage) => void;
  updateMessageCallback?: (data: APIUpdateMessage) => void;
  createFixedMessageCallback?: (data: APIMessage) => void;
  deleteFixedMessageCallback?: (data: APIDeleteFixedMessage) => void;
  messageReadCallback?: (data: APIMessageRead) => void;
  deleteUserOfChatCallback?: (data: APIOutUserOfChat) => void;
}

export const useDialogSocket = ({
  createMessageCallback,
  deleteMessageCallback,
  updateMessageCallback,
  createFixedMessageCallback,
  deleteFixedMessageCallback,
  messageReadCallback,
  deleteUserOfChatCallback,
}: IUseDialogSocket) => {
  const user = useAppSelector(selectorProfile);

  const createdMessage = (data: APIMessage) => {
    createMessageCallback && createMessageCallback(data);
  };

  const deletedMessage = (data: APIDeleteMessage) => {
    deleteMessageCallback && deleteMessageCallback(data);
  };

  const updateMessage = (data: APIUpdateMessage) => {
    updateMessageCallback && updateMessageCallback(data);
  };

  const createdFixedMessage = (data: APIMessage) => {
    createFixedMessageCallback && createFixedMessageCallback(data);
  };

  const deleteFixedMessage = (data: APIDeleteFixedMessage) => {
    deleteFixedMessageCallback && deleteFixedMessageCallback(data);
  };

  const readMessage = (data: APIMessageRead) => {
    messageReadCallback && messageReadCallback(data);
  };

  const userOutOfChat = (data: APIOutUserOfChat) => {
    deleteUserOfChatCallback && deleteUserOfChatCallback(data);
  };

  const connectSocket = () => {
    SocketApi.socket?.on('new_message', createdMessage);
    SocketApi.socket?.on('remove_message', deletedMessage);
    SocketApi.socket?.on('edit_message', updateMessage);
    SocketApi.socket?.on('new_fixed_message', createdFixedMessage);
    SocketApi.socket?.on('remove_fixed_message', deleteFixedMessage);
    SocketApi.socket?.on('delivered_message', readMessage);
    SocketApi.socket?.on('delete_user_chat', userOutOfChat);
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
    };
  }, [user.id]);
};
