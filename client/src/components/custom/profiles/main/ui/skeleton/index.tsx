import React from 'react';
import { SProfileContainer } from '../mainProfile.styled';
import { Skeleton } from 'antd';

const SkeletonMainProfile = () => {
  return (
    <SProfileContainer>
      <Skeleton.Button size="large" active />
    </SProfileContainer>
  );
};

export default SkeletonMainProfile;
