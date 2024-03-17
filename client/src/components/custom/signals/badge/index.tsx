import React, { FC } from 'react';
import { BadgeProps } from 'antd';
import { SBadgeAntd } from './badge.styled';

const Badge: FC<BadgeProps> = (props) => {
  return <SBadgeAntd {...props} />;
};

export default Badge;
