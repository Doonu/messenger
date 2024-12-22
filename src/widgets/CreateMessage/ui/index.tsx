import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { IoSend, IoClose } from 'react-icons/io5';
import { GoPaperclip } from 'react-icons/go';
import { createMessage, updateMessage } from '@entities/dialogs';

import {
  SButton,
  SContainer,
  SInfo,
  SForm,
  SInput,
  SEdit,
  SClose,
  SMessage,
} from './createMessage.styled';
import { ICreateMessage } from '../model/ICreateMessage';

export const CreateMessage: FC<ICreateMessage> = ({
  chatId,
  editedMessage,
  linkToEditionMessage,
  deleteEditMessage,
}) => {
  const user = useAppSelector(selectorProfile);
  const [message, setMessage] = useState('');

  const handlerChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handlerCreateMessage = () => {
    if (!message.length) return;

    if (editedMessage?.id) {
      updateMessage({
        userId: user.id,
        dialogId: chatId,
        content: message.toString().split('\n'),
        id: editedMessage.id,
      });
    }

    if (!editedMessage?.id) {
      createMessage({
        dialogId: chatId,
        userId: user.id,
        content: message.toString().split('\n'),
      });
    }

    setMessage('');
  };

  const handlerDelete = () => {
    setMessage('');
    deleteEditMessage();
  };

  useEffect(() => {
    if (editedMessage?.id) setMessage(editedMessage.content.join(''));
  }, [editedMessage?.id]);

  return (
    <SContainer>
      {editedMessage?.id && (
        <SInfo>
          <SEdit>
            <div>
              Редактирование
              <SMessage onClick={linkToEditionMessage}>сообщение</SMessage>
            </div>
            <SClose onClick={handlerDelete}>
              <IoClose />
            </SClose>
          </SEdit>
        </SInfo>
      )}
      <SForm>
        <SButton>
          <GoPaperclip size={20} />
        </SButton>
        <SInput
          value={message}
          onChange={handlerChangeMessage}
          minRows={1}
          maxRows={12}
          isDrag={false}
          $position
          placeholder="Написать сообщение..."
          draggable="false"
        />
        <SButton onClick={handlerCreateMessage}>
          <IoSend />
        </SButton>
      </SForm>
    </SContainer>
  );
};
