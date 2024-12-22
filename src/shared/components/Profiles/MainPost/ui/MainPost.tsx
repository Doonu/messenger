import React, { FC } from 'react';
import { convertName } from '@shared/util';
import { PhotoProfile } from '@shared/components';
import { useNavigate } from 'react-router-dom';

import { IMainPost } from '../model/mainPost.types';
import { SContainer, SContainerName, SName, STime } from './mainPost.styles';

export const MainPost: FC<IMainPost> = ({ name, avatar, time, id, status }) => {
  const navigate = useNavigate();

  return (
    <SContainer>
      <PhotoProfile status={status} img={avatar} name={name} />
      <SContainerName>
        <SName onClick={() => navigate(`/profile/${id}`)}>{convertName(name)}</SName>
        <STime>{time}</STime>
      </SContainerName>
    </SContainer>
  );
};
