import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IDialogChat } from 'shared/models/IDialog';
import { dialogHook, getDialogById } from 'shared/api';
import { IMessage } from 'shared/models/IMessage';
import { getAllMessagesByDialogId } from 'shared/api';
import Navigate from './navigate';
import { SChat, SContainer, SContent, SLine, SNewMessage } from './chat.styled';
import AllContainer from 'components/layouts/all';
import { Message } from 'widgets/items/message';
import CreateMessage from 'widgets/forms/createMessage';
import { compositionMessages, compositionRevert } from '../lib/compositMessages';
import { IChat } from '../model/IChat';
import FixedMessage from './fixedMessage';
import { scrollToById } from 'shared/util/scrollTo';
import ChatInfo from 'features/chatInfo';
import { ObserverList } from 'components/custom/lists/ObserverList';
import Modal from 'components/navigation/modal/ui';
import { filterNewMessages } from '../lib/filterNewMessages';

const Chat = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const idParam = Number(params['id']);
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

  const handlerGetChat = () => {
    if (idParam)
      dispatch(getDialogById(idParam))
        .unwrap()
        .then((data) => {
          setChat(data);
          setFixedMessage(data.fixedMessage);
          if (!messages.length) getAllMessages();
        })
        .catch(() => {});
  };

  const getAllMessages = () => {
    if (idParam) {
      dispatch(getAllMessagesByDialogId({ dialogId: idParam, page: 1, limit }))
        .unwrap()
        .then((data) => {
          const { newMessages, allMessages } = filterNewMessages({
            fetchedData: data,
            limit,
            callback: () => {},
          });

          setPage(1);
          setMessages(compositionMessages(allMessages));
          setNewMessages(compositionMessages(newMessages));

          if (allMessages.length) setIsMore(true);
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const nextPageGetAllMessages = async (currentPage?: number, isUsingScroll = true) => {
    if (idParam) {
      setIsLoading(true);
      const initialHeight = chatRef.current?.scrollHeight;
      await dispatch(
        getAllMessagesByDialogId({
          dialogId: idParam,
          page: currentPage ? currentPage : page + 1,
          limit,
        })
      )
        .unwrap()
        .then((data) => {
          if (data.length !== limit) setIsMore(false);

          const { newMessages, allMessages } = filterNewMessages({
            fetchedData: data,
            limit,
            currentPage,
            callback: (page) => nextPageGetAllMessages(page, false),
          });

          setPage((prev) => prev + 1);
          setMessages((prev) => [...compositionMessages(allMessages), ...prev]);
          if (newMessages.length)
            setNewMessages((prev) => [...compositionMessages(newMessages), ...prev]);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));

      requestAnimationFrame(() => {
        const newHeight = chatRef.current?.scrollHeight;

        if (newHeight && initialHeight && chatRef.current) {
          chatRef.current.scrollTop = newHeight - initialHeight;
        }

        if (!isUsingScroll) scrollToDown('end');
      });
    }
  };

  const scrollToEditionMessage = () => {
    scrollToById(editedMessage?.id);
  };

  const scrollToDown = (
    block: ScrollIntoViewOptions['block'],
    behavior?: ScrollIntoViewOptions['behavior']
  ) => {
    newMessageRef.current?.scrollIntoView({ block: block, behavior: behavior || 'auto' });
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

  dialogHook({
    id: idParam,
    setNewMessages,
    setMessages,
    scrollTo: scrollToDown,
    newMessagesRefState,
    setFixedMessage,
    setChoiceMessages,
    setEditedMessage,
    setChat,
    setInfoPlayers,
    navigate,
    chatRefState,
  });

  useEffect(() => {
    handlerGetChat();
  }, []);

  useEffect(() => {
    if (messages.length) {
      scrollToDown('start');
    }
  }, [messages.length]);

  useEffect(() => {
    newMessagesRefState.current = newMessages;

    if (newMessages.length) {
      setIsRead(false);
    }
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
        {fixedMessage?.id && (
          <FixedMessage setFixedMessage={setFixedMessage} fixedMessage={fixedMessage} />
        )}
        <SChat ref={chatRef} id="chat_container">
          <ObserverList
            list={messages}
            notFoundMessage="Напишите сообщение"
            isPending={isLoading}
            isFetching={isLoading}
            fetchNextPage={nextPageGetAllMessages}
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
          <div ref={newMessageRef}>
            <SNewMessage $view={!!newMessages.length}>
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
