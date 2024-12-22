import React from 'react';

export interface HorizontalListTypes<T> {
  list: T[];
  itemContent: (item: T, index: number) => React.ReactNode;
  loading: boolean;
}
