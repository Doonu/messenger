import React, { Dispatch, FC, SetStateAction } from 'react';
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
import { scrollTo } from 'shared/util/scrollTo';
import { useParams } from 'react-router-dom';
import { deleteFixedMessage } from 'shared/api/socket/dialog';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';

interface IFixedMessage {
  setFixedMessage: Dispatch<SetStateAction<IMessage | null | undefined>>;
  fixedMessage?: IMessage | null;
}

const FixedMessage: FC<IFixedMessage> = ({ fixedMessage }) => {
  const params = useParams();
  const idParam = params['id'];

  const user = useAppSelector(selectorProfile);

  const scrollToFixedMessage = () => {
    scrollTo(fixedMessage?.id);
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
            <span>{fixedMessage?.author.name}</span>
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
