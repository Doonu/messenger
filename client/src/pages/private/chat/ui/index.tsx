import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { IDialog } from 'shared/models/IDialog';
import { useDialogSocket, getDialogById } from 'shared/api';
import { APIMessage, IMessage } from 'shared/models/IMessage';
import { getAllMessagesByDialogId } from 'shared/api';
import Navigate from './Navigate';
import { SChat, SContainer } from './chat.styled';
import AllContainer from 'components/layouts/all';
import { Message } from 'widgets/items/message';
import { messageConverting } from 'shared/converteitions';
import CreateMessage from 'widgets/forms/createMessage';
import {
  addInCompositionMessages,
  compositionMessages,
  compositionRevert,
  deleteInCompositionMessages,
  updateInCompositionMessages,
} from '../lib/compositMessages';
import { IChat, IDeleted, IUpdate } from '../model/IChat';
import FixedMessage from './FixedMessage';

const Chat = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const idParam = params['id'];
  const chatRef = useRef<HTMLDivElement | null>(null);

  const [chat, setChat] = useState<IDialog>();

  const [messages, setMessages] = useState<IChat[]>([]);
  const [choiceMessages, setChoiceMessages] = useState<number[]>([]);
  const [editedMessage, setEditedMessage] = useState<IMessage | null>();
  const [fixedMessage, setFixedMessage] = useState<IMessage | null>();

  const [page, setPage] = useState(1);

  const createMessageCallback = (data: APIMessage) => {
    if (idParam && data.dialogId === +idParam) {
      const convertingData = messageConverting(data);
      setMessages((prev) => addInCompositionMessages(convertingData, prev));
    }
  };

  const deleteMessageCallback = ({ dialogId, messagesId }: IDeleted) => {
    if (idParam && dialogId === +idParam) {
      setMessages((prev) => deleteInCompositionMessages(messagesId, prev));
      setChoiceMessages([]);
    }
  };

  const updateMessageCallback = (data: IUpdate) => {
    if (idParam && data.dialogId === +idParam) {
      setMessages((prev) => updateInCompositionMessages(data.id, data.content, prev));
      setChoiceMessages([]);
      setEditedMessage(null);
    }
  };

  const handlerChoice = (id: number) => {
    if (!choiceMessages.includes(id)) setChoiceMessages((prev) => [...prev, id]);
    else setChoiceMessages((prev) => prev.filter((el) => el !== id));
  };

  //TODO: переделать на один запрос(бэк готов)
  const handlerGetChat = () => {
    if (idParam)
      dispatch(getDialogById(+idParam))
        .unwrap()
        .then((data) => {
          setChat(data);
          setFixedMessage(data.fixedMessage);

          dispatch(getAllMessagesByDialogId(+idParam))
            .unwrap()
            .then((data) => {
              setMessages(compositionMessages(data));
              setPage(2);
            })
            .catch(() => {});
        })
        .catch(() => {});
  };

  const scrollToBottom = () => {
    const height = chatRef.current?.scrollHeight;
    if (height) {
      chatRef.current?.scrollTo(0, height);
    }
  };

  //TODO: Вынести в share
  const scrollToEditionMessage = () => {
    // @ts-ignore
    document.getElementById(`${editedMessage?.id}`).scrollIntoView({ behavior: 'smooth' });
  };

  const handlerUpdate = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    const findMessage = compositionRevert(messages).find((el) => el.id === id);
    setEditedMessage(findMessage);
  };

  const handlerDeleteEditMessage = () => setEditedMessage(null);

  useDialogSocket({ createMessageCallback, deleteMessageCallback, updateMessageCallback });

  useEffect(() => {
    handlerGetChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AllContainer isFooter={false} $isSticky>
      <SContainer>
        <Navigate
          onCansel={() => setChoiceMessages([])}
          chat={chat}
          allMessages={messages}
          choiceMessages={choiceMessages}
        />
        {fixedMessage?.id && <FixedMessage fixedMessage={fixedMessage} />}
        <SChat ref={chatRef}>
          {messages.map((el) => (
            <Message
              key={el.author.id}
              handlerUpdate={handlerUpdate}
              choiceMessages={choiceMessages}
              handlerChoice={handlerChoice}
              {...el}
            />
          ))}
        </SChat>
        <CreateMessage
          deleteEditMessage={handlerDeleteEditMessage}
          linkToEditionMessage={scrollToEditionMessage}
          editedMessage={editedMessage}
          chatId={chat?.id}
        />
      </SContainer>
    </AllContainer>
  );
};

export default Chat;
