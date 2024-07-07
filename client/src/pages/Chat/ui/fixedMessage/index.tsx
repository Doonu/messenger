import React, { FC } from 'react';
import { IMessage } from '@shared/models';
import { BsPinAngleFill } from 'react-icons/bs';
import { getTime, scrollToById } from '@shared/util';
import { IoClose } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { deleteFixedMessage } from '@shared/api';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';

import {
  SContainer,
  SContainerIcon,
  SContent,
  SInfo,
  SMessage,
  SName,
} from './fixedMessage.styled';

interface IFixedMessage {
  fixedMessage?: IMessage | null;
}

const FixedMessage: FC<IFixedMessage> = ({ fixedMessage }) => {
  const params = useParams();
  const idParam = params.id;

  const user = useAppSelector(selectorProfile);

  const scrollToFixedMessage = () => {
    scrollToById(fixedMessage?.id);
  };

  const handlerDeleteFixed = () => {
    if (idParam) {
      deleteFixedMessage({ dialogId: +idParam, userId: user.id });
    }
  };

  return (
    <SContainer onClick={scrollToFixedMessage}>
      <SInfo>
        <BsPinAngleFill size={20} />
        <SContent>
          <SName>
            <span>{fixedMessage?.author?.name}</span>
            {fixedMessage && getTime(fixedMessage.createdAt)}
          </SName>
          <SMessage>{fixedMessage?.content}</SMessage>
        </SContent>
      </SInfo>
      <SContainerIcon onClick={handlerDeleteFixed}>
        <IoClose size={20} />
      </SContainerIcon>
    </SContainer>
  );
};

export default FixedMessage;
