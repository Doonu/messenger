import React, { FC } from 'react';
import { convertName } from '@shared/util';
import { PhotoProfile } from '@shared/components';
import { useNavigate } from 'react-router-dom';

import { IMainPost } from '../model/IMainPost';
import { SContainer, SContainerName, SName, STime } from './mainPost.styled';

export const MainPost: FC<IMainPost> = ({ name, avatar, time, id, status, statusTime }) => {
  const navigate = useNavigate();

  return (
    <SContainer>
      <PhotoProfile status={status} statusTime={statusTime} img={avatar} name={name} />
      <SContainerName>
        <SName onClick={() => navigate(`/profile/${id}`)}>{convertName(name)}</SName>
        <STime>{time}</STime>
      </SContainerName>
    </SContainer>
  );
};
