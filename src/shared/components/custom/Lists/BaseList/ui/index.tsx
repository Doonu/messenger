import React from 'react';
import { LoaderSmall } from '@shared/components';

import { IBaseList } from '../model/IBaseList';
import { SBaseList, SMore } from './baseList.styled';

export const BaseList = <T,>({
  list,
  isPending,
  itemContent,
  hasMore,
  fetchNextPage,
  isBorderBottom = true,
  isPadding = true,
}: IBaseList<T>) => {
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
