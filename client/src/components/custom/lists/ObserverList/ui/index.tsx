import React, { useEffect } from 'react';
// @ts-ignore
import { useInView } from 'react-intersection-observer';
import { ObserverBlock, SList } from './ObserverList.styled';
import { IObserverList } from '../model/IObserverList';
import Empty from '../../../../ui/empty';
import { LoaderSmall } from '../../../../ui/loaders';

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

const ObserverList = <T, K>({
  list,
  notFoundMessage,
  isFetching,
  fetchNextPage,
  isPending,
  itemContent,
  hasMore,
  skeleton,
}: IObserverList<T, K>) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: false,
  });

  const isFetchingNextPage =
    document.body.clientHeight < window.scrollY + 100 && hasMore && entry?.intersectionRatio === 1;

  useEffect(() => {
    if (isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <SList>
        {list.map((el) => itemContent(el))}
        {isPending && [...new Array(5)].map(() => skeleton())}
      </SList>
      <ObserverBlock ref={ref} />
      {isFetching && <LoaderSmall />}
      {!list.length && !isPending && <Empty message={notFoundMessage} />}
    </>
  );
};

export default ObserverList;
