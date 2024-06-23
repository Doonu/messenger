import React, { useEffect } from 'react';
// @ts-ignore
import { useInView } from 'react-intersection-observer';
import { ObserverBlock, SList } from './ObserverList.styled';
import { IObserverList } from '../model/IObserverList';
import Empty from 'shared/components/ui/empty';
import { LoaderSmall } from 'shared/components/ui/loaders';

/**
 *   data - Массив для рендера
 *   itemContent - ReactNode для рендера
 *   fetchNextPage — Callback при прокрутке в конце списка
 *   isPending — Первичная загрузка данных
 *   isFetching — Дозагрузка данных
 *   isNotFound — Данные не найдены
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
  refContainer,
}: IObserverList<T, K>) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: false,
  });

  const isFetchingNextPage =
    document.body.clientHeight <
      (window.scrollY + 100 !== 100 || (refContainer?.current?.scrollHeight || 0) + 100) &&
    hasMore &&
    entry?.intersectionRatio === 1;

  const isFetchingNextPageTop = window.scrollY === 0 && hasMore && entry?.intersectionRatio === 1;

  const nextPageTop = async () => {
    const initialHeight = refContainer?.current?.scrollHeight;

    await fetchNextPage();

    requestAnimationFrame(() => {
      const newHeight = refContainer?.current?.scrollHeight;

      if (newHeight && initialHeight && refContainer.current) {
        refContainer.current.scrollTop = newHeight - initialHeight;
      }
    });
  };

  useEffect(() => {
    if (position === 'bottom' && isFetchingNextPage) {
      fetchNextPage();
    }
    if (position === 'top' && isFetchingNextPageTop) {
      nextPageTop();
    }
  }, [inView]);

  return (
    <>
      {position === 'top' && <ObserverBlock ref={ref} />}
      <SList $gap={gap}>
        {!isFetching && list.map((el, index) => itemContent(el, index))}
        {isPending && [...new Array(5)].map((el, i) => skeleton(i))}
      </SList>
      {position === 'bottom' && <ObserverBlock ref={ref} />}
      {isFetching && <LoaderSmall />}
      {isEmpty || (!list.length && !isPending && <Empty message={notFoundMessage} />)}
    </>
  );
};

export default ObserverList;
