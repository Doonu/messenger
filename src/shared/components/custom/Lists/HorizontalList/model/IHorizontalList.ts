import React from 'react';

export interface IHorizontalList<T> {
  list: T[];
  itemContent: (item: T, index: number) => React.ReactNode;
  loading: boolean;
}
