import React, { FC } from 'react';
import { IUser, IUserExcept } from 'shared/models/IUser';
import { SContainer, SName } from './pickFriend.styled';
import PhotoProfile from 'components/custom/profiles/photo';
import CheckBox from 'components/ui/checkbox/ui/CheckBox';

interface IPickFriend {
  user: IUserExcept;
  usersPick: IUser[];
  pickUser: (user: IUser) => void;
}

const PickFriend: FC<IPickFriend> = ({ user, pickUser, usersPick }) => {
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

export default PickFriend;
