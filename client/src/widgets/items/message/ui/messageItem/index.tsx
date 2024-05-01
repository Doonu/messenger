import React, { MouseEvent, FC, useState, RefObject } from 'react';
import { SChoiceMessage, SContainer, SContent, SFutures, SInfo, SP } from './messageItem.styled';
import { LuPencil } from 'react-icons/lu';
import { PiShareFatLight } from 'react-icons/pi';
import { FaRegStar } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IMessageItem } from 'pages/private/chat/model/IChat';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
// @ts-ignore
import { useInView } from 'react-intersection-observer';
import { readMessage } from 'shared/api/socket/dialog';
import { useParams } from 'react-router-dom';

interface IMessage {
  messageItem: IMessageItem;
  index: number;
  handlerChoice: (id: number) => void;
  handlerUpdate: (event: MouseEvent<HTMLDivElement>, id: number) => void;
  choiceMessages: number[];
  isRead: boolean;
  chatRef: RefObject<HTMLDivElement>;
}

const MessageItem: FC<IMessage> = ({
  messageItem,
  index,
  handlerChoice,
  choiceMessages,
  handlerUpdate,
  isRead,
  chatRef,
}) => {
  const { ref, entry } = useInView({
    threshold: 0,
    initialInView: true,
    skip: isRead,
    root: chatRef.current,
    rootMargin: '10px',
    onChange: () => {
      if (
        !messageItem.readStatus &&
        idParam &&
        user.id !== messageItem.userId &&
        entry?.intersectionRatio === 0
      ) {
        readMessage({ messageId: messageItem.id, dialogId: +idParam, userId: user.id });
      }
    },
  });

  const params = useParams();
  const idParam = params['id'];

  const [isShow, setIsShow] = useState(false);
  const isNotFirstElement = index !== 0;
  const isChoice = choiceMessages.includes(messageItem.id);
  const user = useAppSelector(selectorProfile);

  return (
    <>
      <SContainer
        $isFirstElement={isNotFirstElement}
        $isChoice={isChoice}
        onClick={() => handlerChoice(messageItem.id)}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        id={`${messageItem.id}`}
      >
        <SInfo>
          <SContent>
            {messageItem.content.map((content, i) => (
              <SP key={messageItem.id + i}>{content}</SP>
            ))}
          </SContent>
        </SInfo>

        {(isShow || isChoice) && (
          <SChoiceMessage $isFirstElement={isNotFirstElement}>
            <FaRegCircleCheck color={'white'} size={20} />
          </SChoiceMessage>
        )}

        {isShow && (
          <SFutures $isFirstElement={isNotFirstElement}>
            {user.id === messageItem.userId && (
              <div onClick={(e) => handlerUpdate(e, messageItem.id)}>
                <LuPencil size={20} />
              </div>
            )}
            <PiShareFatLight size={20} />
            <FaRegStar size={20} />
          </SFutures>
        )}
      </SContainer>
      <div style={{ height: '10px' }} ref={ref} />
    </>
  );
};

export default MessageItem;
