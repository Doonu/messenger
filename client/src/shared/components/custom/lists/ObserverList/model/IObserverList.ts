import React, { RefObject } from 'react';

export interface IObserverList<T, K> {
  list: T[];
  itemContent: (element: T, index?: number) => React.ReactNode;
  fetchNextPage: () => Promise<void>;
  hasMore: boolean;
  skeleton: (element: number) => React.ReactNode;
  notFoundMessage: string;
  refContainer?: RefObject<HTMLDivElement>;
  isPending?: boolean;
  isFetching?: boolean;
  position?: 'bottom' | 'top';
  isEmpty?: boolean;
  gap?: number;
}
