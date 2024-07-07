import React, { FC } from 'react';

import { SBadgeAntd } from './badge.styled';
import { IBadge } from '../model/IBadge';

// TODO: переделать
export const Badge: FC<IBadge> = (props) => {
  // return <SBadgeAntd $isAbsolute={props.$isAbsolute} {...props} />;
  return <div>badge</div>;
};
