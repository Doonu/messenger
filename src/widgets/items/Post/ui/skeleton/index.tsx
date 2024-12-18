import React from 'react';
import { Skeleton, Space } from 'antd';

import { SContainerSkeleton, SProfile, SProfileInfo, STop } from './skeletonPost.styled';

export const SkeletonPost = () => {
  return (
    <SContainerSkeleton>
      <STop>
        <SProfile>
          <Skeleton.Avatar active size="large" />
          <SProfileInfo>
            <Skeleton.Button active />
            <Skeleton.Input active size="small" />
          </SProfileInfo>
        </SProfile>
        <Skeleton.Button active size="large" />
      </STop>
      <br />
      <br />
      <Skeleton active paragraph={{ rows: 2 }} />
      <br />
      <Space>
        <Skeleton.Button />
        <Skeleton.Button />
        <Skeleton.Button />
      </Space>
    </SContainerSkeleton>
  );
};
