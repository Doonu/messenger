import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { IVirtualizedList } from '../model/IVirtualizedList';
import { LoaderSmall } from '../../../../ui/loaders';
import Empty from '../../../../ui/empty';

/**
 *   data - Массив для рендера
 *
 *   itemContent - ReactNode для рендера
 *
 *   fetchNextPage — Callback при прокрутке в конце списка
 *
 *   isPending — Первичная загрузка данных
 *
 *   isFetching — Дозагрузка данных
 *
 *   isNotFound — Данные не найдены
 **/

const VirtualizedList = <D, C>({
  data,
  itemContent,
  fetchNextPage,
  isPending,
  isFetching,
  isNotFound,
  Skeleton,
}: IVirtualizedList<D, C>) => {
  const isLoading = isPending || isFetching;

  const handlerEndReached = () => {
    if (data && data.length >= 30) fetchNextPage();
  };

  return (
    <>
      <Virtuoso
        useWindowScroll={true}
        data={data}
        itemContent={itemContent}
        endReached={handlerEndReached}
      />
      {isFetching && <LoaderSmall />}
      {!isLoading && isNotFound && <Empty message={'Нет данных'} />}
      {isPending && data?.map((_, index) => <Skeleton key={index} />)}
    </>
  );
};

export default VirtualizedList;
