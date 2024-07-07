import React, { FC } from 'react';

import { ISelect } from '../model/ISelect';
import { SSelect } from './select.styled';

export const Select: FC<ISelect> = ({ ...props }) => {
  return <SSelect bordered={false} {...props} />;
};
