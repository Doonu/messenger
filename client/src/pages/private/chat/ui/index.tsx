import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { IDialog } from 'shared/models/IDialog';
import { useDialogSocket, getDialogById } from 'shared/api';
import { APIMessage, IMessage } from 'shared/models/IMessage';
import { getAllMessagesByDialogId } from 'shared/api';
import Navigate from './navigate';
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
import { IChat, APIDeleteMessage, APIUpdateMessage, APIDeleteFixedMessage } from '../model/IChat';
import FixedMessage from './fixedMessage';
import { index, scrollToRef } from 'shared/util/scrollTo';
import ChatInfo from 'features/chatInfo';
import { ObserverList } from 'components/custom/lists/ObserverList';
import Modal from 'components/navigation/modal/ui';

const Chat = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const idParam = params['id'];
  const chatRef = useRef<HTMLDivElement | null>(null);

  const [chat, setChat] = useState<IDialog>(); // Получение информацию о чате
  const [choiceMessages, setChoiceMessages] = useState<number[]>([]); // Выбор сообщений
  const [editedMessage, setEditedMessage] = useState<IMessage | null>(); // Редактируемое сообщение
  const [fixedMessage, setFixedMessage] = useState<IMessage | null>(); // Фиксированное сообщение
  const [infoPlayers, setInfoPlayers] = useState(false); // Открытие модального окна

  const [messages, setMessages] = useState<IChat[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMore, setIsMore] = useState(true);
  const [isUpdateScroll, setIsUpdateScroll] = useState(false); // Обновление скролла
  const limit = 30;

  /*WebSocket*/
  const createMessageCallback = (data: APIMessage) => {
    if (idParam && data.dialogId === +idParam) {
      const convertingData = messageConverting(data);
      setMessages((prev) => addInCompositionMessages(convertingData, prev));
      setIsUpdateScroll(true);
    }
  };

  const deleteMessageCallback = ({
    dialogId,
    messagesId,
    isFixedDeleteMessage,
  }: APIDeleteMessage) => {
    if (idParam && dialogId === +idParam) {
      setMessages((prev) => deleteInCompositionMessages(messagesId, prev));
      setChoiceMessages([]);
      if (isFixedDeleteMessage) setFixedMessage(null);
      setIsUpdateScroll(true);
    }
  };

  const updateMessageCallback = (data: APIUpdateMessage) => {
    if (idParam && data.dialogId === +idParam) {
      setMessages((prev) => updateInCompositionMessages(data.id, data.content, prev));
      setChoiceMessages([]);
      setEditedMessage(null);
      if (data.updateFixedMessage) setFixedMessage(messageConverting(data.updateFixedMessage));
    }
  };

  const createFixedMessageCallback = (data: APIMessage) => {
    if (idParam && data.dialogId === +idParam) {
      const convertingData = messageConverting(data);
      setFixedMessage(convertingData);
      setChoiceMessages([]);
    }
  };

  const deleteFixedMessageCallback = (data: APIDeleteFixedMessage) => {
    if (idParam && data.dialogId === +idParam) {
      setFixedMessage(null);
      setChoiceMessages([]);
    }
  };
  /*WebSocket*/

  const handlerChoice = (id: number) => {
    if (!choiceMessages.includes(id)) setChoiceMessages((prev) => [...prev, id]);
    else setChoiceMessages((prev) => prev.filter((el) => el !== id));
  };

  const handlerGetChat = () => {
    if (idParam)
      dispatch(getDialogById(+idParam))
        .unwrap()
        .then((data) => {
          setChat(data);
          setFixedMessage(data.fixedMessage);

          getAllMessages();
        })
        .catch(() => {});
  };

  const getAllMessages = () => {
    if (idParam) {
      dispatch(getAllMessagesByDialogId({ dialogId: +idParam, page: 1, limit }))
        .unwrap()
        .then((data) => {
          if (!data.length) setIsMore(false);
          setMessages(compositionMessages(data));
          setPage(1);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const nextPageGetAllMessages = async () => {
    if (idParam && page === 1) {
      setIsLoading(true);
      const currentHeight = chatRef.current?.scrollHeight;
      await dispatch(getAllMessagesByDialogId({ dialogId: +idParam, page: page + 1, limit }))
        .unwrap()
        .then((data) => {
          if (data.length !== limit) setIsMore(false);
          setMessages((prev) => [...compositionMessages(data), ...prev]);
          setPage((prev) => prev + 1);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });

      requestAnimationFrame(() => {
        const newHeight = chatRef.current?.scrollHeight;
        if (newHeight && currentHeight && chatRef.current)
          chatRef.current.scrollTop = newHeight - currentHeight;
      });
    }
  };

  const scrollToEditionMessage = () => {
    index(editedMessage?.id);
  };

  const handlerUpdate = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    const findMessage = compositionRevert(messages).find((el) => el.id === id);
    setEditedMessage(findMessage);
  };

  const handlerDeleteEditMessage = () => setEditedMessage(null);

  useDialogSocket({
    createMessageCallback,
    deleteMessageCallback,
    updateMessageCallback,
    createFixedMessageCallback,
    deleteFixedMessageCallback,
  });

  useEffect(() => {
    handlerGetChat();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setIsUpdateScroll(false);
      scrollToRef({ ref: chatRef, isScrollFast: true });
    }

    if (isUpdateScroll) {
      setIsUpdateScroll(false);
      scrollToRef({ ref: chatRef, isScrollFast: false });
    }
  }, [isUpdateScroll, page]);

  return (
    <AllContainer isFooter={false} $isSticky>
      <Modal isFooter={false} onClose={() => setInfoPlayers(false)} open={infoPlayers} top="15%">
        <ChatInfo {...chat} />
      </Modal>
      <SContainer>
        <Navigate
          onCansel={() => setChoiceMessages([])}
          setInfoPlayers={setInfoPlayers}
          chat={chat}
          allMessages={messages}
          choiceMessages={choiceMessages}
        />
        {fixedMessage?.id && (
          <FixedMessage setFixedMessage={setFixedMessage} fixedMessage={fixedMessage} />
        )}
        <SChat ref={chatRef}>
          <ObserverList
            list={messages}
            notFoundMessage="Напишите сообщение"
            isPending={isLoading && page === 0}
            isFetching={isLoading && page > 1}
            fetchNextPage={nextPageGetAllMessages}
            itemContent={(el) => (
              <Message
                key={el.author.id}
                handlerUpdate={handlerUpdate}
                choiceMessages={choiceMessages}
                handlerChoice={handlerChoice}
                {...el}
              />
            )}
            skeleton={() => <div>...Загрузка</div>}
            hasMore={isMore}
            position="top"
          />
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
