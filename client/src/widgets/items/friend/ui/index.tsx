import React, { FC } from 'react';
import { IUser } from '../../../../shared/models/IUser';
import { SContainer, SInfo, SName, SService } from './friend.styled';
import PhotoProfile from '../../../../components/custom/profiles/photo';
import BaseButton from '../../../../components/ui/buttons/baseButton';
import { useNavigate } from 'react-router-dom';

const Friend: FC<IUser> = (user) => {
  const navigate = useNavigate();

  return (
    <SContainer onClick={() => navigate(`/profile/${user.id}`)}>
      <PhotoProfile size={70} img={user.avatar} name={user.name} />
      <SInfo>
        <SName>
          {user.name} ({user.friends.length} друзей)
        </SName>
        <SService>
          <BaseButton bgTransparent>Написать сообщение</BaseButton>
          <BaseButton bgTransparent>Позвонить</BaseButton>
        </SService>
      </SInfo>
    </SContainer>
  );
};

export default Friend;
