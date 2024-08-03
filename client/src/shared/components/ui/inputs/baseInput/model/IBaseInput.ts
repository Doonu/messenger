import { InputProps } from 'antd/es/input/Input';
import { ReactNode } from 'react';
import { ReactTypicalProps } from 'react-typical';

export type InputBorder = 'all' | 'right' | 'left' | 'none' | 'rightNone';

export interface IBaseInput extends InputProps {
  border?: InputBorder;
  height?: string;
  type?: string;
  minWidth?: string;
  loading?: boolean;
  sizeLoading?: number;
  isBgTransparent?: boolean;
  prevIcon?: ReactNode;
  animationPlaceholder?: ReactTypicalProps['steps'];
}

export interface IVariantType {
  type?: string;
  icon?: ReactNode;
}
