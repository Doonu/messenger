import React from 'react';
import { useDevice } from '@shared/hooks';

import { SOrderBy, SButtonOrder, STabs, SSelect } from './sorting.styles';
import { convertedSelect } from '../lib/convertedSelect';
import { SortingProps } from '../model/sorting.types';

export const Sorting = <OrderType,>({
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
