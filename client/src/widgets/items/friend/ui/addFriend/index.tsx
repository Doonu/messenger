import React, { FC } from 'react';
import BaseButton from '../../../../../components/ui/buttons/baseButton';
import { SContainer } from './addFriend.styled';

interface IAddFriend {
  addFriendHandler: () => void;
  viewAddFriendService: boolean;
  isSendFriend?: boolean;
}

const AddFriend: FC<IAddFriend> = ({ addFriendHandler, viewAddFriendService, isSendFriend }) => {
  return (
    <SContainer>
      {!viewAddFriendService && !isSendFriend && (
        <BaseButton onClick={addFriendHandler} height="30px">
          Добавить в друзья
        </BaseButton>
      )}
      {(viewAddFriendService || isSendFriend) && <div>Вы отправлии приглашение в друзья</div>}
    </SContainer>
  );
};

export default AddFriend;
