import React, { FC } from 'react';

import { SCheckBox } from './checkBox.styled';
import { ICheckBox } from '../model/ICheckBox';

export const CheckBox: FC<ICheckBox> = ({ radius = 'box', size = 'secondary', ...props }) => {
  return <SCheckBox $radius={radius} $size={size} {...props} />;
};
