import { ISegment } from '@shared/ui';

import { IOptions } from '../model/options.types';

export const generateOptions = ({ counts }: IOptions): ISegment['options'] => [
  { label: `Все участники ${counts?.[0]}`, value: 'all' },
  { label: `Администраторы ${counts?.[1]}`, value: 'admin' },
];
