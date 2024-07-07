import { IBaseButton } from './IBaseButton';

export interface BaseButtonProps extends Omit<IBaseButton, 'leftIcon' | 'bgTransparent'> {
  $isLeftIcon: boolean;
  $bgTransparent?: boolean;
}
