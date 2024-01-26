import { IAction } from '../../../model/IToolbar';
import { PaintBrush, Resizer, Text } from '../../../../../shared/assets/icons';

export const arrayAction: IAction[] = [
  { type: 'burch', Icon: PaintBrush },
  { type: 'resize', Icon: Resizer },
  { type: 'text', Icon: Text },
];
