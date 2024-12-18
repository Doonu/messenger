import { PaintBrush, Resizer, Text } from '@shared/assets';

import { IAction } from '../../../model/IToolbar';

export const arrayAction: IAction[] = [
  { type: 'burch', Icon: PaintBrush },
  { type: 'resize', Icon: Resizer },
  { type: 'text', Icon: Text },
];
