import React from 'react';

export interface IBaseList<T, K> {
  list: T[];
  itemContent: (element: T) => React.ReactNode;
  isPending: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  isBorderBottom: boolean;
  isPadding?: boolean;
}
