import React from 'react';

export interface IObserverList<T, K> {
  list: T[];
  itemContent: (element: T, index?: number) => React.ReactNode;
  fetchNextPage: () => void;
  hasMore: boolean;
  skeleton: () => React.ReactNode;
  notFoundMessage: string;
  isPending?: boolean;
  isFetching?: boolean;
  position?: 'bottom' | 'top';
}
