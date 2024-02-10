import { TabsProps } from 'antd';

export type IFilterCommentsKeys = '1' | '2';

export const filterComments: TabsProps['items'] = [
  {
    key: '1',
    label: 'По новизне',
  },
  {
    key: '2',
    label: 'По популярности',
  },
];
