import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IDialogChat } from 'shared/models/IDialog';
import { useDialogSocket, getDialogById } from 'shared/api';
import { APIMessage, IMessage } from 'shared/models/IMessage';
import { getAllMessagesByDialogId } from 'shared/api';
import Navigate from './navigate';
import { SChat, SContainer, SContent, SLine, SNewMessage } from './chat.styled';
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
  updateStatusRead,
} from '../lib/compositMessages';
import {
  IChat,
  APIDeleteMessage,
  APIUpdateMessage,
  APIDeleteFixedMessage,
  APIMessageRead,
  APIOutUserOfChat,
} from '../model/IChat';
import FixedMessage from './fixedMessage';
import { scrollToById } from 'shared/util/scrollTo';
import ChatInfo from 'features/chatInfo';
import { ObserverList } from 'components/custom/lists/ObserverList';
import Modal from 'components/navigation/modal/ui';
import { filterNewMessages } from '../lib/filterNewMessages';
import { selectorProfile } from 'entities/profile/profile.selectors';

const Chat = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const idParam = params['id'];
  const navigate = useNavigate();

  const user = useAppSelector(selectorProfile);

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
  const [isMore, setIsMore] = useState(true);
  const limit = 50;

  const chatRef = useRef<HTMLDivElement | null>(null);
  const newMessageRef = useRef<HTMLDivElement | null>(null);
  const chatRefState = useRef(chat);
  const newMessagesRefState = useRef<IChat[]>([]);

  /*WebSocket*/
  const createMessageCallback = async (data: APIMessage) => {
    if (idParam && data.dialogId === +idParam) {
      const convertingData = messageConverting(data);

      if (newMessagesRefState.current.length) {
        setNewMessages((prev) => addInCompositionMessages(convertingData, prev));
      } else {
        setMessages((prev) => addInCompositionMessages(convertingData, prev));
      }

      scrollToDown('start', 'smooth');
    }
  };

  const deleteMessageCallback = ({
    dialogId,
    messagesId,
    isFixedDeleteMessage,
  }: APIDeleteMessage) => {
    if (idParam && dialogId === +idParam) {
      setMessages((prev) => deleteInCompositionMessages(messagesId, prev));
      setNewMessages((prev) => deleteInCompositionMessages(messagesId, prev));
      setChoiceMessages([]);
      if (isFixedDeleteMessage) setFixedMessage(null);
    }
  };

  const updateMessageCallback = (data: APIUpdateMessage) => {
    if (idParam && data.dialogId === +idParam) {
      setMessages((prev) => updateInCompositionMessages(data.id, data.content, prev));
      setNewMessages((prev) => updateInCompositionMessages(data.id, data.content, prev));
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

  const messageReadCallback = (data: APIMessageRead) => {
    if (idParam && data.dialogId === +idParam) {
      setNewMessages((prev) => updateStatusRead(data.messageId, prev));
      setChat(
        (prev) =>
          prev && {
            ...prev,
            countNotReadMessages:
              prev.countNotReadMessages === 0 ? 0 : prev.countNotReadMessages - 1,
          }
      );
    }
  };

  const deleteUserOfChatCallback = (data: APIOutUserOfChat) => {
    if (idParam && data.dialogId === +idParam) {
      if (data.participant === user.id) {
        navigate(`/dialog`);
      }

      const filterParticipants = chatRefState.current?.participants.filter(
        (el) => el.id !== data.participant
      );

      filterParticipants &&
        setChat(
          (prev) =>
            prev && {
              ...prev,
              participants: filterParticipants,
            }
        );
      const convertingData = messageConverting(data.message);

      if (newMessagesRefState.current.length) {
        setNewMessages((prev) => addInCompositionMessages(convertingData, prev));
      } else {
        setMessages((prev) => addInCompositionMessages(convertingData, prev));
      }
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
        })
        .catch(() => {});
  };

  const getAllMessages = () => {
    if (idParam) {
      dispatch(getAllMessagesByDialogId({ dialogId: +idParam, page: 1, limit }))
        .unwrap()
        .then((data) => {
          if (!data.length) setIsMore(false);
          const { newMessages, allMessages } = filterNewMessages({
            fetchedData: data,
            limit,
            callback: (page) => nextPageGetAllMessages(page, false),
          });

          setPage(1);
          setMessages(compositionMessages(allMessages));
          setNewMessages(compositionMessages(newMessages));

          if (!newMessages.length) scrollToDown('end');
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
          dialogId: +idParam,
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

          requestAnimationFrame(() => {
            const newHeight = chatRef.current?.scrollHeight;

            if (newHeight && initialHeight && chatRef.current && isUsingScroll) {
              chatRef.current.scrollTop = newHeight - initialHeight;
            }

            if (!isUsingScroll) {
              scrollToDown('end');
            }
          });
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
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

  useDialogSocket({
    createMessageCallback,
    deleteMessageCallback,
    updateMessageCallback,
    createFixedMessageCallback,
    deleteFixedMessageCallback,
    messageReadCallback,
    deleteUserOfChatCallback,
  });

  useEffect(() => {
    handlerGetChat();
    if (messages.length) getAllMessages();
  }, []);

  useEffect(() => {
    if (messages.length) setIsRead(false);
  }, [messages]);

  useEffect(() => {
    chatRefState.current = chat;
  }, [chat]);

  useEffect(() => {
    newMessagesRefState.current = newMessages;
  }, [newMessages]);

  return (
    <AllContainer isFooter={false} $isSticky>
      <Modal isFooter={false} onClose={() => setInfoPlayers(false)} open={infoPlayers} top="15%">
        <ChatInfo setChat={setChat} chat={chat} />
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
            itemContent={(el, index) => (
              <Message
                key={JSON.stringify(el.messages) + index}
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
            <SNewMessage $view={!!newMessages.length} ref={newMessageRef}>
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
                {newMessages.map((el, index) => (
                  <Message
                    key={JSON.stringify(el.messages) + index}
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
