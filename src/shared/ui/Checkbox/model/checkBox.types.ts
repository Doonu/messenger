import { CheckboxProps } from 'antd';

export interface ICheckBox extends CheckboxProps {
  size?: 'primary' | 'secondary';
  radius?: 'circle' | 'box';
}

export interface ICheckBoxStyle {
  $size: 'primary' | 'secondary';
  $radius: 'circle' | 'box';
}
