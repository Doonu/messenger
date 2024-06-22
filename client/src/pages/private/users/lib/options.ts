import { ISegmented } from 'shared/components/ui/segment';

interface IOptions {
  counts: number[];
}

export const generateOptions = ({ counts }: IOptions): ISegmented['options'] => [
  { label: `Все друзья ${counts[0]}`, value: 'all' },
  { label: `Друзья онлайн ${counts[1]}`, value: 'connected' },
];
