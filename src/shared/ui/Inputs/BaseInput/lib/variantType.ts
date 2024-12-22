import { Invisible, VisibleIcon } from '@shared/assets';

import { IVariantType } from '../model/baseInput.types';

export const allVariantType: IVariantType[] = [
  {
    type: 'password',
    icon: Invisible(),
  },
  { type: 'text', icon: VisibleIcon() },
];
