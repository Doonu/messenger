import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { LoaderSmall, Empty } from '@shared/ui';

import { SList } from './observerList.styles';
import { ObserverListTypes } from '../model/observerList.types';

/**
 *   data - Массив для рендера
 *   itemContent - ReactNode для рендера
 *   fetchNextPage — Callback при прокрутке в конце списка
 *   isPending — Первичная загрузка данных
 *   isFetching — Дозагрузка данных
 *   isNotFound — Данные не найдены
 *   position - С какой стороны прогрузка при скроле
 * */

// TODO: вернуть

export const ObserverList = <T,>({
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
}: ObserverListTypes<T>) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: false,
  });

  // const isFetchingNextPage =
  //   document.body.clientHeight <
  //     (window.scrollY + 100 !== 100 || (refContainer?.current?.scrollHeight || 0) + 100) &&
  //   hasMore &&
  //   entry?.intersectionRatio === 1;

  const isFetchingNextPage = 0;

  const isFetchingNextPageTop = window.scrollY === 0 && hasMore && entry?.intersectionRatio === 1;

  const nextPageTop = async () => {
    const initialHeight = refContainer?.current?.scrollHeight;

    await fetchNextPage();

    requestAnimationFrame(() => {
      const newHeight = refContainer?.current?.scrollHeight;

      if (newHeight && initialHeight && refContainer?.current) {
        // eslint-disable-next-line no-param-reassign
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
      {position === 'top' && <div ref={ref} />}
      <SList $gap={gap}>
        {!isFetching && list.map((el, index) => itemContent(el, index))}
        {isPending && [...new Array(5)].map((el, i) => skeleton(i))}
      </SList>
      {position === 'bottom' && <div ref={ref} />}
      {isFetching && <LoaderSmall />}
      {isEmpty || (!list.length && !isPending && <Empty message={notFoundMessage} />)}
    </>
  );
};
