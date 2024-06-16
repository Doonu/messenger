import React, { FC } from 'react';
import { CheckboxProps } from 'antd';
import { SCheckBox } from './checkBox.styled';

interface ICheckBox extends CheckboxProps {
  size?: 'primary' | 'secondary';
  radius?: 'circle' | 'box';
}

const CheckBox: FC<ICheckBox> = ({ radius = 'box', size = 'secondary', ...props }) => {
  return <SCheckBox $radius={radius} $size={size} {...props}></SCheckBox>;
};

export default CheckBox;
