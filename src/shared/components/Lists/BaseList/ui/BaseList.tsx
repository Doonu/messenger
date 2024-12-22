import React from 'react';
import { LoaderSmall } from '@shared/ui';

import { BaseListTypes } from '../model/baseList.types';
import { SBaseList, SMore } from './baseList.styles';

export const BaseList = <T,>({
  list,
  isPending,
  itemContent,
  hasMore,
  fetchNextPage,
  isBorderBottom = true,
  isPadding = true,
}: BaseListTypes<T>) => {
  return (
    <>
      {!!list.length && (
        <SBaseList $isPadding={isPadding} $isBorder={isBorderBottom}>
          {list.map((item) => itemContent(item))}
        </SBaseList>
      )}
      {isPending && <LoaderSmall />}
      {hasMore && <SMore onClick={fetchNextPage}>Загрузить еще</SMore>}
    </>
  );
};
