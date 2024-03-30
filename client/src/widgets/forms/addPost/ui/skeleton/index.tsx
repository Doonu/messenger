import React from 'react';
import { Skeleton } from 'antd';
import { SContainer } from './skeletonAddPost.styled';

const SkeletonAddPost = () => {
  return (
    <SContainer>
      <Skeleton.Avatar size="large" active />
      <Skeleton.Input block size="large" active />
    </SContainer>
  );
};

export default SkeletonAddPost;
