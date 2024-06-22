import React from 'react';
import { BlockContainer } from 'shared/styles/containers';
import {
  SContent,
  SCount,
  SHeader,
  SInfo,
  SLocation,
  SName,
  SProfileContainer,
  SUserStatistic,
} from './mainAdvanced.styled';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile, selectorProfileLoader } from 'entities/profile/profile.selectors';
import SkeletonMainAdvancedProfile from './skeleton';
import PhotoProfile from 'shared/components/custom/profiles/photo';

const MainAdvancedProfile = () => {
  const user = useAppSelector(selectorProfile);
  const loader = useAppSelector(selectorProfileLoader);

  if (loader) {
    return <SkeletonMainAdvancedProfile />;
  }

  return (
    <BlockContainer>
      <SHeader />
      <SProfileContainer>
        {user.avatar && (
          <PhotoProfile
            isAbsolute={true}
            top={-20}
            left={20}
            size={60}
            img={user.avatar}
            name={user.name}
          />
        )}
        <SInfo>
          <SName>{user.name}</SName>
          <SLocation>Нижний Новгород</SLocation>
        </SInfo>
      </SProfileContainer>
      <SContent>
        <SUserStatistic>
          <SCount>11К</SCount>
          <>Followers</>
        </SUserStatistic>
        <SUserStatistic>
          <SCount>1.4К</SCount>
          <>Following</>
        </SUserStatistic>
      </SContent>
    </BlockContainer>
  );
};

export default MainAdvancedProfile;
