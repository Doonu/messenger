import React, { FC } from 'react';

import { SBadgeAntd } from './badge.styled';
import { IBadge } from '../model/IBadge';

export const Badge: FC<IBadge> = (props) => {
  return <SBadgeAntd $isAbsolute={props.$isAbsolute} {...props} />;
};
