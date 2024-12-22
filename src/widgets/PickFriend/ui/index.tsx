import React, { FC } from 'react';
import { PhotoProfile } from '@shared/components';
import { CheckBox } from '@shared/ui';

import { IPickFriend } from '../model/IPickFriend';
import { SContainer, SName } from './pickFriend.styled';

export const PickFriend: FC<IPickFriend> = ({ user, pickUser, usersPick }) => {
  const isChecked = usersPick.find((el) => el.id === user.id);

  return (
    <SContainer onClick={() => pickUser(user)}>
      <SName>
        <PhotoProfile img={user.avatar} name={user.name} />
        {user.name}
      </SName>
      <CheckBox checked={!!isChecked} size="primary" radius="circle" />
    </SContainer>
  );
};
