import { ISegment } from '@shared/ui';

interface IOptions {
  counts: number[];
}

export const generateOptions = ({ counts }: IOptions): ISegment['options'] => [
  { label: `Все друзья ${counts[0]}`, value: 'all' },
  { label: `Друзья онлайн ${counts[1]}`, value: 'connected' },
];
