import React, { FC } from 'react';
import { IMessage } from 'shared/models/IMessage';
import {
  SContainer,
  SContainerIcon,
  SContent,
  SInfo,
  SMessage,
  SName,
} from './fixedMessage.styled';
import { BsPinAngleFill } from 'react-icons/bs';
import { getTime } from 'shared/util/time';
import { IoClose } from 'react-icons/io5';

interface IFixedMessage {
  fixedMessage?: IMessage | null;
}

const FixedMessage: FC<IFixedMessage> = ({ fixedMessage }) => {
  //TODO: Вынести в share
  const scrollToFixedMessage = () => {
    // @ts-ignore
    document.getElementById(`${fixedMessage?.id}`).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SContainer onClick={scrollToFixedMessage}>
      <SInfo>
        <BsPinAngleFill size={20} />
        <SContent>
          <SName>
            <span>{fixedMessage?.author.name}</span>
            {fixedMessage && getTime(fixedMessage.createdAt)}
          </SName>
          <SMessage>{fixedMessage?.content}</SMessage>
        </SContent>
      </SInfo>
      <SContainerIcon>
        <IoClose size={20} />
      </SContainerIcon>
    </SContainer>
  );
};

export default FixedMessage;
