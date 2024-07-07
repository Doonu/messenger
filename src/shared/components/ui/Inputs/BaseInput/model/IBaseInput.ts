import { InputProps } from 'antd/es/input/Input';
import { ReactNode } from 'react';

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
}

export interface IVariantType {
  type?: string;
  icon?: ReactNode;
}
