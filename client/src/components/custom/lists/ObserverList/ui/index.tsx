import React, { useEffect } from 'react';
// @ts-ignore
import { useInView } from 'react-intersection-observer';
import { ObserverBlock, SList } from './ObserverList.styled';
import { IObserverList } from '../model/IObserverList';
import Empty from 'components/ui/empty';
import { LoaderSmall } from 'components/ui/loaders';

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
 *
 *   position - С какой стороны прогрузка при скроле
 **/

const ObserverList = <T, K>({
  list,
  notFoundMessage,
  isFetching,
  fetchNextPage,
  isPending,
  itemContent,
  hasMore,
  skeleton,
  position = 'bottom',
  isEmpty,
  gap = 15,
}: IObserverList<T, K>) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: false,
  });

  const isFetchingNextPage =
    document.body.clientHeight < window.scrollY + 100 && hasMore && entry?.intersectionRatio === 1;

  const isFetchingNextPageTop = window.scrollY === 0 && hasMore && entry?.intersectionRatio === 1;

  useEffect(() => {
    if (
      (position === 'bottom' && isFetchingNextPage) ||
      (position === 'top' && isFetchingNextPageTop)
    ) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {position === 'top' && <ObserverBlock ref={ref} />}
      <SList $gap={gap}>
        {list.map((el, index) => itemContent(el, index))}
        {isPending && [...new Array(5)].map(() => skeleton())}
      </SList>
      {position === 'bottom' && <ObserverBlock ref={ref} />}
      {isFetching && <LoaderSmall />}
      {isEmpty || (!list.length && !isPending && <Empty message={notFoundMessage} />)}
    </>
  );
};

export default ObserverList;
