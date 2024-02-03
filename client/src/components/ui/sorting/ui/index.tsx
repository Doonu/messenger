import React from 'react';
import { TabsProps } from 'antd';

import { SOrderBy, SButtonOrder, STabs, SSelect } from './Sorting.styled';
import convertedSelect from '../lib';
import useDevice from '../../../../hooks/useDevice';

interface SortingProps<OrderType> {
  tabs: TabsProps['items'];
  orderBy: OrderType;
  orderDirection: 0 | 1;
  onChangeDirection: () => void;
  onChangeTabs: (activeKey: OrderType) => void;
  disabled?: boolean;
}

const Sorting = <OrderType,>({
  tabs,
  orderBy,
  orderDirection,
  onChangeTabs,
  onChangeDirection,
  disabled = false,
}: SortingProps<OrderType>) => {
  const handlerChangeOrderBy = (activeKey: string) => {
    onChangeTabs(activeKey as OrderType);
  };

  const { isTablets } = useDevice();

  const selectOptions = convertedSelect(tabs);

  return (
    <SOrderBy>
      {!!onChangeDirection && (
        <SButtonOrder disabled={disabled} direction={orderDirection} onClick={onChangeDirection} />
      )}

      {isTablets && (
        <SSelect
          defaultValue={selectOptions && (selectOptions[0].label as string)}
          onChange={(e) => handlerChangeOrderBy(e as string)}
          options={selectOptions}
        />
      )}

      {!isTablets && !!onChangeTabs && (
        <STabs
          onChange={handlerChangeOrderBy}
          items={tabs}
          activeKey={orderBy as string}
          defaultActiveKey={orderBy as string}
        />
      )}
    </SOrderBy>
  );
};

export default Sorting;
