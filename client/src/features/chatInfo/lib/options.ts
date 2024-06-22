import { ISegmented } from 'shared/components/ui/segment';

interface IOptions {
  counts?: number[];
}

export const generateOptions = ({ counts }: IOptions): ISegmented['options'] => [
  { label: `Все участники ${counts?.[0]}`, value: 'all' },
  { label: `Администраторы ${counts?.[1]}`, value: 'admin' },
];
