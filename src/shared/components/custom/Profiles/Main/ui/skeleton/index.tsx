import React from 'react';
import { Skeleton } from 'antd';

import { SProfileContainer } from '../mainProfile.styled';

const SkeletonMainProfile = () => {
  return (
    <SProfileContainer>
      <Skeleton.Button size="large" active />
    </SProfileContainer>
  );
};

export default SkeletonMainProfile;
