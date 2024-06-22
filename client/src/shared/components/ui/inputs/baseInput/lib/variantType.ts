import { InvisibleIcon, VisibleIcon } from 'shared/assets';
import { IVariantType } from '../model/baseInput.type';

export const allVariantType: IVariantType[] = [
  {
    type: 'password',
    icon: InvisibleIcon(),
  },
  { type: 'text', icon: VisibleIcon() },
];
