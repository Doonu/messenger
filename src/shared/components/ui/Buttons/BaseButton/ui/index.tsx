import React, { FC } from 'react';

import { SButton } from './baseButton.styled';
import { IBaseButton } from '../model/IBaseButton';

// TODO: Мб переименовать(какой это нахрен BaseContainer)

export const BaseButton: FC<IBaseButton> = ({
  htmlType,
  children,
  disabled,
  loading,
  variant = 'primary',
  height = '40px',
  radius,
  leftIcon,
  rightIcon,
  color,
  bgTransparent,
  ...props
}) => {
  return (
    <SButton
      height={height}
      variant={variant}
      htmlType={htmlType}
      loading={loading}
      disabled={disabled}
      radius={radius}
      $isLeftIcon={!!leftIcon}
      $bgTransparent={bgTransparent}
      color={color}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </SButton>
  );
};
