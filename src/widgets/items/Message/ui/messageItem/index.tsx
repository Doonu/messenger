import React, { FC, useState, useEffect } from 'react';
import { LuPencil } from 'react-icons/lu';
import { PiShareFatLight } from 'react-icons/pi';
import { FaRegStar } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { useInView } from 'react-intersection-observer';
import { readMessage } from '@shared/api';
import { useParams } from 'react-router-dom';

import { IMessageItemProps } from '../../model/IMessage';
import { SChoiceMessage, SContainer, SContent, SFutures, SInfo, SP } from './messageItem.styled';

const MessageItem: FC<IMessageItemProps> = ({
  messageItem,
  index,
  handlerChoice,
  choiceMessages,
  handlerUpdate,
  isRead,
  chatRef,
}) => {
  const params = useParams();
  const idParam = params.id;

  const { ref, entry, inView } = useInView({
    threshold: 1,
    initialInView: true,
    skip: isRead,
    root: chatRef.current,
    rootMargin: '10px',
    onChange: () => {
      if (
        !messageItem.readStatus &&
        idParam &&
        user.id !== messageItem.userId &&
        entry?.intersectionRatio === 1
      ) {
        readMessage({ messageId: messageItem.id, dialogId: +idParam, userId: user.id });
      }
    },
  });

  useEffect(() => {
    if (!messageItem.readStatus && inView && idParam && entry?.intersectionRatio === 1) {
      readMessage({ messageId: messageItem.id, dialogId: +idParam, userId: user.id });
    }
  }, [inView, entry?.intersectionRatio]);

  const [isShow, setIsShow] = useState(false);
  const isNotFirstElement = index !== 0;
  const isChoice = choiceMessages.includes(messageItem.id);
  const user = useAppSelector(selectorProfile);

  const handlerOnMouseEnter = () => {
    if (messageItem.status === 'main') setIsShow(true);
  };

  const handlerOnMouseLeave = () => {
    if (messageItem.status === 'main') setIsShow(false);
  };

  const handlerClickMessage = () => {
    if (messageItem.status === 'main') {
      handlerChoice(messageItem.id);
    }
  };

  return (
    <>
      <SContainer
        $isFirstElement={isNotFirstElement}
        $status={messageItem.status}
        $isChoice={isChoice}
        onClick={handlerClickMessage}
        onMouseEnter={handlerOnMouseEnter}
        onMouseLeave={handlerOnMouseLeave}
        id={`${messageItem.id}`}
      >
        <SInfo>
          <SContent>
            {messageItem.content.map((content, i) => (
              <SP key={messageItem.id + i} $status={messageItem.status}>
                {content}
              </SP>
            ))}
          </SContent>
        </SInfo>

        {(isShow || isChoice) && (
          <SChoiceMessage $isFirstElement={isNotFirstElement}>
            <FaRegCircleCheck color="white" size={20} />
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
