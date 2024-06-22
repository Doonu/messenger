import React, { FC } from 'react';
import { BadgeProps } from 'antd';
import { SBadgeAntd } from './badge.styled';

interface IBadge extends BadgeProps {
  isAbsolute?: boolean;
}

const Badge: FC<IBadge> = (props) => {
  return <SBadgeAntd $isAbsolute={props.isAbsolute} {...props} />;
};

export default Badge;
