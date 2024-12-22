import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { ObserverList } from '@shared/components';
import { Message } from '@widgets/Message';
import { CreateMessage } from '@widgets/CreateMessage';
import { scrollToById } from '@shared/util';
import { ChatInfo } from '@features/ChatInfo';
import { selectorProfile } from '@entities/profile';
import {
  APIDeleteFixedMessage,
  APIDeleteMessage,
  APIMessage,
  APIMessageRead,
  APINewNameChat,
  APINewUsers,
  APIOutUserOfChat,
  APIUpdateMessage,
  getDialogById,
  getNewMessagesByDialog,
  getOldMessagesByDialogId,
  IChat,
  IDialogChat,
  IMessage,
  useDialog,
} from '@entities/dialogs';
import { AllContainer } from '@app/layouts';
import { Modal } from '@shared/ui';

import Navigate from './Navigate/Navigate';
import FixedMessage from './FixedMessage/FixedMessage';
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
} from '../lib/handlers.realTime';
import { compositionMessages, compositionRevert } from '../lib/compositMessages';
import { SChat, SContainer, SContent, SLine, SNewMessage } from './chat.styles';

const Chat = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);
  const params = useParams();
  const idParam = Number(params.id);
  const navigate = useNavigate();

  const [chat, setChat] = useState<IDialogChat | null>(null); // Получение информацию о чате
  const [choiceMessages, setChoiceMessages] = useState<number[]>([]); // Выбор сообщений
  const [editedMessage, setEditedMessage] = useState<IMessage | null>(); // Редактируемое сообщение
  const [fixedMessage, setFixedMessage] = useState<IMessage | null>(); // Фиксированное сообщение
  const [infoPlayers, setInfoPlayers] = useState(false); // Открытие модального окна
  const [isRead, setIsRead] = useState(true); // Возможность читать

  const [messages, setMessages] = useState<IChat[]>([]);
  const [newMessages, setNewMessages] = useState<IChat[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMore, setIsMore] = useState(false);
  const limit = 50;

  const chatRef = useRef<HTMLDivElement | null>(null);
  const newMessageRef = useRef<HTMLDivElement | null>(null);
  const chatRefState = useRef(chat);
  const newMessagesRefState = useRef<IChat[]>([]);

  const handlerChoice = (id: number) => {
    if (!choiceMessages.includes(id)) setChoiceMessages((prev) => [...prev, id]);
    else setChoiceMessages((prev) => prev.filter((el) => el !== id));
  };

  const scrollToDown = (
    block: ScrollIntoViewOptions['block'],
    behavior?: ScrollIntoViewOptions['behavior']
  ) => {
    newMessageRef.current?.scrollIntoView({ block, behavior: behavior || 'auto' });
  };

  const handlerGetChat = () => {
    if (idParam) {
      dispatch(getDialogById(idParam))
        .unwrap()
        .then((data) => {
          setChat(data);
          setFixedMessage(data.fixedMessage);
        })
        .catch(() => {});
    }
  };

  const getNewMessages = () => {
    if (idParam) {
      dispatch(getNewMessagesByDialog(idParam))
        .unwrap()
        .then((data) => {
          setNewMessages(compositionMessages(data));

          scrollToDown('start');
          setIsRead(false);
        })
        .catch(() => {});
    }
  };

  const getOldMessages = () => {
    if (idParam) {
      dispatch(getOldMessagesByDialogId({ dialogId: idParam, page: 1, limit }))
        .unwrap()
        .then((data) => {
          setPage(1);
          setMessages(compositionMessages(data));

          if (data.length) setIsMore(true);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const nextPageGetOldMessages = async (currentPage?: number) => {
    if (idParam) {
      setIsLoading(true);

      await dispatch(
        getOldMessagesByDialogId({
          dialogId: idParam,
          page: currentPage || page + 1,
          limit,
        })
      )
        .unwrap()
        .then((data) => {
          if (data.length !== limit) setIsMore(false);

          setPage((prev) => prev + 1);
          setMessages((prev) => [...compositionMessages(data), ...prev]);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  };

  const scrollToEditionMessage = () => {
    scrollToById(editedMessage?.id);
  };

  const handlerUpdate = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.stopPropagation();
    let findMessage = compositionRevert(messages).find((el) => el.id === id);
    if (!findMessage) {
      findMessage = compositionRevert(newMessages).find((el) => el.id === id);
    }

    setEditedMessage(findMessage);
  };

  const handlerDeleteEditMessage = () => setEditedMessage(null);

  useDialog({
    createMessage: (data: APIMessage) =>
      createMessageCallback({
        data,
        setMessages,
        setNewMessages,
        scrollTo: scrollToDown,
        id: idParam,
        ref: newMessagesRefState,
      }),
    deleteMessage: (data: APIDeleteMessage) =>
      deleteMessageCallback({
        data,
        id: idParam,
        setMessages,
        setFixedMessage,
        setNewMessages,
        setChoiceMessages,
      }),
    updateMessage: (data: APIUpdateMessage) =>
      updateMessageCallback({
        data,
        id: idParam,
        setFixedMessage,
        setMessages,
        setNewMessages,
        setChoiceMessages,
        setEditedMessage,
      }),
    createFixedMessage: (data: APIMessage) =>
      createFixedMessageCallback({
        data,
        id: idParam,
        setFixedMessage,
        setChoiceMessages,
      }),
    deleteFixedMessage: (data: APIDeleteFixedMessage) =>
      deleteFixedMessageCallback({ setFixedMessage, setChoiceMessages, id: idParam, data }),
    readMessage: (data: APIMessageRead) =>
      messageReadCallback({ setNewMessages, data, setChat, id: idParam }),
    deleteUserOutOfChat: (data: APIOutUserOfChat) =>
      deleteUserOfChatCallback({
        data,
        id: idParam,
        userId: user.id,
        setChat,
        chatRefState,
        newMessagesRefState,
        setNewMessages,
        setMessages,
        navigate,
      }),
    addNewUser: (data: APINewUsers) =>
      updateUsersInChatCallback({
        data,
        id: idParam,
        setChat,
        newMessagesRefState,
        setNewMessages,
        setMessages,
        setInfoPlayers,
      }),
    newNameChat: (data: APINewNameChat) =>
      updateNameChatCallback({
        data,
        id: idParam,
        setChat,
        newMessagesRefState,
        setNewMessages,
        setMessages,
      }),
  });

  useEffect(() => {
    handlerGetChat();
  }, []);

  useEffect(() => {
    if (chat?.id) {
      getOldMessages();
      getNewMessages();
    }
  }, [chat?.id]);

  useEffect(() => {
    newMessagesRefState.current = newMessages;
  }, [newMessages.length]);

  useEffect(() => {
    chatRefState.current = chat;
  }, [chat]);

  return (
    <AllContainer isFooter={false} $isSticky>
      <Modal isFooter={false} onClose={() => setInfoPlayers(false)} open={infoPlayers} top="15%">
        <ChatInfo chat={chat} />
      </Modal>
      <SContainer>
        <Navigate
          onCansel={() => setChoiceMessages([])}
          setInfoPlayers={setInfoPlayers}
          chat={chat}
          allMessages={messages}
          newMessages={newMessages}
          choiceMessages={choiceMessages}
        />
        {fixedMessage?.id && <FixedMessage fixedMessage={fixedMessage} />}
        <SChat ref={chatRef} id="chat_container">
          <ObserverList
            list={messages}
            notFoundMessage="Напишите сообщение"
            isPending={isLoading}
            isFetching={isLoading}
            refContainer={chatRef}
            fetchNextPage={nextPageGetOldMessages}
            itemContent={(el) => (
              <Message
                key={el.id}
                isRead={isRead}
                chatRef={chatRef}
                handlerUpdate={handlerUpdate}
                choiceMessages={choiceMessages}
                handlerChoice={handlerChoice}
                {...el}
              />
            )}
            skeleton={() => <div>...Загрузка</div>}
            hasMore={isMore}
            position="top"
            isEmpty={!!(messages.length + newMessages.length)}
          />
          <div>
            <SNewMessage ref={newMessageRef} $view={!!newMessages.length}>
              {!!newMessages.length && (
                <>
                  <SLine />
                  <SContent>Новые сообщения</SContent>
                  <SLine />
                </>
              )}
            </SNewMessage>
            {!!newMessages.length && (
              <SChat>
                {newMessages.map((el) => (
                  <Message
                    key={el.id}
                    isRead={isRead}
                    chatRef={chatRef}
                    handlerUpdate={handlerUpdate}
                    choiceMessages={choiceMessages}
                    handlerChoice={handlerChoice}
                    {...el}
                  />
                ))}
              </SChat>
            )}
          </div>
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
