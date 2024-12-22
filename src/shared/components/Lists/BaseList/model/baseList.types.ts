import React from 'react';

export interface IBaseList {
  $isBorder: boolean;
  $isPadding: boolean;
}

export interface BaseListTypes<T> {
  list: T[];
  itemContent: (element: T) => React.ReactNode;
  isPending: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  isBorderBottom: boolean;
  isPadding?: boolean;
}
