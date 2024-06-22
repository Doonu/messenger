import React, { FC } from 'react';
import { SContainer, SContainerName, SName, STime } from './mainPost.styled';
import { IMainPost } from '../model/IMainPost';
import { convertName } from 'shared/util/user';
import PhotoProfile from 'shared/components/custom/profiles/photo';
import { useNavigate } from 'react-router-dom';

const MainPostProfile: FC<IMainPost> = ({ name, avatar, time, id, status, statusTime }) => {
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

export default MainPostProfile;
