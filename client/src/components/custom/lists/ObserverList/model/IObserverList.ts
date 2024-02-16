import React from 'react';

export interface IObserverList<T, K> {
  list: T[];
  itemContent: (element: T) => React.ReactNode;
  fetchNextPage: () => void;
  hasMore: boolean;
  notFoundMessage: string;
  isPending?: boolean;
  isFetching?: boolean;
  skeleton: () => React.ReactNode;
}
