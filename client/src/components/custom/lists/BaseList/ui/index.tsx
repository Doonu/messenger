import React from 'react';
import { IBaseList } from '../model/IBaseList';
import { LoaderSmall } from 'components/ui/loaders';
import { SContainerComments, SMore } from './baseList.styled';

const BaseList = <T, K>({
  list,
  isPending,
  itemContent,
  hasMore,
  fetchNextPage,
  isBorderBottom = true,
  isPadding = true,
}: IBaseList<T, K>) => {
  return (
    <>
      {!!list.length && (
        <SContainerComments $isPadding={isPadding} $isBorder={isBorderBottom}>
          {list.map((item) => itemContent(item))}
        </SContainerComments>
      )}
      {isPending && <LoaderSmall />}
      {hasMore && <SMore onClick={fetchNextPage}>Загрузить еще</SMore>}
    </>
  );
};

export default BaseList;
