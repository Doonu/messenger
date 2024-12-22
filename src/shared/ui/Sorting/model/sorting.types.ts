import { TabsProps } from 'antd';

export interface SortingProps<OrderType> {
  tabs: TabsProps['items'];
  orderBy: OrderType;
  orderDirection: 0 | 1;
  onChangeDirection: () => void;
  onChangeTabs: (activeKey: OrderType) => void;
  disabled?: boolean;
}

export interface SortingOrderProps {
  direction: 1 | 0;
}
