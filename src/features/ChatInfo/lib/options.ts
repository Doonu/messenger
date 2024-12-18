import { ISegment } from '@shared/components';

interface IOptions {
  counts?: number[];
}

export const generateOptions = ({ counts }: IOptions): ISegment['options'] => [
  { label: `Все участники ${counts?.[0]}`, value: 'all' },
  { label: `Администраторы ${counts?.[1]}`, value: 'admin' },
];
