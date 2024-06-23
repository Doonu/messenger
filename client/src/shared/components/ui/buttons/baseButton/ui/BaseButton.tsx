import React, { FC } from 'react';
import { SButton } from './BaseButton.styled';
import { IBaseButton } from '../model/IBaseButton';

//TODO: Мб переименовать(какой это нахрен base)

const BaseButton: FC<IBaseButton> = ({
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

export default BaseButton;
