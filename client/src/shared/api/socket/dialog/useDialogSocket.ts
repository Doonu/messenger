import SocketApi from '../socket-api';
import { useEffect } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { APIMessage } from '../../../models/IMessage';
import { IDeleted, IUpdate } from 'pages/private/chat/model/IChat';

interface IUseDialogSocket {
  createMessageCallback?: (data: APIMessage) => void;
  deleteMessageCallback?: (data: IDeleted) => void;
  updateMessageCallback?: (data: IUpdate) => void;
}

export const useDialogSocket = ({
  createMessageCallback,
  deleteMessageCallback,
  updateMessageCallback,
}: IUseDialogSocket) => {
  const user = useAppSelector(selectorProfile);

  const createdMessage = (data: APIMessage) => {
    createMessageCallback && createMessageCallback(data);
  };

  const deletedMessage = (data: IDeleted) => {
    deleteMessageCallback && deleteMessageCallback(data);
  };

  const updateMessage = (data: IUpdate) => {
    updateMessageCallback && updateMessageCallback(data);
  };

  const connectSocket = () => {
    SocketApi.socket?.on('new_message', createdMessage);
    SocketApi.socket?.on('remove_message', deletedMessage);
    SocketApi.socket?.on('edit_message', updateMessage);
  };

  useEffect(() => {
    if (user.id) connectSocket();

    return () => {
      SocketApi.socket?.off('new_message', createdMessage);
      SocketApi.socket?.off('remove_message', deletedMessage);
      SocketApi.socket?.off('edit_message', updateMessage);
    };
  }, [user.id]);
};
