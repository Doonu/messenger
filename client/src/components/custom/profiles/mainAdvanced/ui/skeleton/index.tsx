import React from 'react';
import { Skeleton } from 'antd';
import {
  SAvatarSkeleton,
  SContainer,
  SInputAbsoluteSkeleton,
  SInputSkeleton,
} from './mainAdvancedProfileSkeleton.styled';
import { BlockContainer } from 'shared/styles/containers';

const SkeletonMainAdvancedProfile = () => {
  return (
    <BlockContainer>
      <SContainer>
        <SInputSkeleton />
        <br />
        <br />
        <SAvatarSkeleton />
        <SInputAbsoluteSkeleton />
        <br />
        <br />
        <div></div>
        <Skeleton paragraph={{ rows: 1 }} />
      </SContainer>
    </BlockContainer>
  );
};

export default SkeletonMainAdvancedProfile;
