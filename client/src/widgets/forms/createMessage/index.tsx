import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { createMessage } from 'shared/api';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { SButton, SContainer, SInfo, SForm, SInput, SEdit, SClose } from './createMessage.styled';
import { IoSend } from 'react-icons/io5';
import { GoPaperclip } from 'react-icons/go';
import { IMessage } from 'shared/models/IMessage';
import { IoClose } from 'react-icons/io5';
import { updateMessage } from '../../../shared/api/socket/dialog';

interface ICreateMessage {
  linkToEditionMessage: () => void;
  deleteEditMessage: () => void;
  editedMessage?: IMessage | null;
  chatId?: number;
}

const CreateMessage: FC<ICreateMessage> = ({
  chatId,
  editedMessage,
  linkToEditionMessage,
  deleteEditMessage,
}) => {
  const user = useAppSelector(selectorProfile);
  const [message, setMessage] = useState('');

  const handlerChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
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
              Редактирование <span onClick={linkToEditionMessage}>сообщение</span>
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
          maxRows={5}
          isDrag={false}
          $position={true}
          placeholder="Написать сообщение..."
          draggable="false"
          bordered
        />
        <SButton onClick={handlerCreateMessage}>
          <IoSend />
        </SButton>
      </SForm>
    </SContainer>
  );
};

export default CreateMessage;
