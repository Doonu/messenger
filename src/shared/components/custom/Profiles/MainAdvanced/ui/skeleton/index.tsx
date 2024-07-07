import React from 'react';
import { Skeleton } from 'antd';
import { BlockContainer } from '@shared/styles';

import {
  SAvatarSkeleton,
  SContainer,
  SInputAbsoluteSkeleton,
  SInputSkeleton,
} from './mainAdvancedProfileSkeleton.styled';

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
        <div />
        <Skeleton paragraph={{ rows: 1 }} />
      </SContainer>
    </BlockContainer>
  );
};

export default SkeletonMainAdvancedProfile;
