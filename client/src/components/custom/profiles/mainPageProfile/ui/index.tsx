import React, { FC } from 'react';

import {
  SActions,
  SBlockContainer,
  SHeader,
  SInfo,
  SName,
  SNavigate,
} from './mainPageProfile.styled';
import PhotoProfile from '../../photo';
import { convertName } from '../../../../../shared/util/user';
import { useAppSelector } from '../../../../../hooks/redux';
import { selectorProfile } from '../../../../../entities';
import { IMainPageProfile } from '../model/IMainPageProfile';

const MainPageProfile: FC<IMainPageProfile> = ({ user }) => {
  const profile = useAppSelector(selectorProfile);
  const isMyProfile = profile.id === user.id;

  return (
    <SBlockContainer>
      <SHeader />
      <PhotoProfile
        fontSize={50}
        isAbsolute
        left={20}
        top={100}
        size={100}
        img={user.avatar}
        name={user.name}
      />
      <SInfo>
        <SNavigate>
          <SName>{convertName(user.name)}</SName>
          <div>статус</div>
        </SNavigate>
        <SActions>{isMyProfile && 'hello'}</SActions>
      </SInfo>
    </SBlockContainer>
  );
};

export default MainPageProfile;
