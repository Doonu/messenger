import React, { MouseEvent, FC, useState } from 'react';
import { SChoiceMessage, SContainer, SContent, SFutures, SInfo, SP } from './messageItem.styled';
import { LuPencil } from 'react-icons/lu';
import { PiShareFatLight } from 'react-icons/pi';
import { FaRegStar } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IMessageItem } from 'pages/private/chat/model/IChat';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';

interface IMessage {
  messageItem: IMessageItem;
  index: number;
  handlerChoice: (id: number) => void;
  handlerUpdate: (event: MouseEvent<HTMLDivElement>, id: number) => void;
  choiceMessages: number[];
}

const MessageItem: FC<IMessage> = ({
  messageItem,
  index,
  handlerChoice,
  choiceMessages,
  handlerUpdate,
}) => {
  const [isShow, setIsShow] = useState(false);
  const isNotFirstElement = index !== 0;
  const isChoice = choiceMessages.includes(messageItem.id);
  const user = useAppSelector(selectorProfile);

  return (
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
  );
};

export default MessageItem;
