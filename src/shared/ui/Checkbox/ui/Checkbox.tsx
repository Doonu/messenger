import React, { FC } from 'react';

import { SCheckBox } from './checkBox.styles';
import { ICheckBox } from '../model/checkBox.types';

export const CheckBox: FC<ICheckBox> = ({ radius = 'box', size = 'secondary', ...props }) => {
  return <SCheckBox $radius={radius} $size={size} {...props} />;
};
