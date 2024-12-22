import React, { FC } from 'react';

import { ISelect } from '../model/select.types';
import { SSelect } from './select.styles';

export const Select: FC<ISelect> = ({ ...props }) => {
  return <SSelect bordered={false} {...props} />;
};
