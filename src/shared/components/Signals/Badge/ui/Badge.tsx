import React, { FC } from 'react';

import { SBadgeAntd } from './badge.styles';
import { IBadge } from '../model/badge.types';

export const Badge: FC<IBadge> = (props) => {
  return <SBadgeAntd $isAbsolute={props.$isAbsolute} {...props} />;
};
