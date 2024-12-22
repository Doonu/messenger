import React, { FC } from 'react';
import { getTime } from '@shared/util';
import { PhotoProfile } from '@shared/components';

import { IMessage } from '../model/IMessage';
import MessageItem from './messageItem';
import {
  SContainer,
  SContainerPhotoProfile,
  SMessageBlock,
  SMessagesUser,
  SName,
  STitle,
} from './message.styled';

export const Message: FC<IMessage> = ({
  messages,
  handlerChoice,
  createdAt,
  author,
  choiceMessages,
  handlerUpdate,
  isRead,
  chatRef,
}) => {
  return (
    <SContainer>
      {author && (
        <SContainerPhotoProfile>
          <PhotoProfile img={author.avatar} name={author.name} />
        </SContainerPhotoProfile>
      )}
      <SMessagesUser>
        {author && (
          <STitle>
            <SName>{author?.name}</SName>
            {createdAt && <span>{getTime(createdAt)}</span>}
          </STitle>
        )}
        <SMessageBlock>
          {messages.map((messageItem, index) => (
            <MessageItem
              key={messageItem.id}
              isRead={isRead}
              chatRef={chatRef}
              handlerUpdate={handlerUpdate}
              choiceMessages={choiceMessages}
              handlerChoice={handlerChoice}
              messageItem={messageItem}
              index={index}
            />
          ))}
        </SMessageBlock>
      </SMessagesUser>
    </SContainer>
  );
};
