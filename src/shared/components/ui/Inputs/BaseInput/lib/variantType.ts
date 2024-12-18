import { Invisible, VisibleIcon } from '@shared/assets';

import { IVariantType } from '../model/IBaseInput';

export const allVariantType: IVariantType[] = [
  {
    type: 'password',
    icon: Invisible(),
  },
  { type: 'text', icon: VisibleIcon() },
];
