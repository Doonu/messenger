import React from 'react';
import { LoaderSmall } from '@shared/ui';

import { HorizontalListTypes } from '../model/horizontalList.types';
import { SList } from './horizontalList.styles';

export const HorizontalList = <T,>({ list, itemContent, loading }: HorizontalListTypes<T>) => {
  if (loading) {
    return <LoaderSmall />;
  }

  return <SList>{list.map((data, index) => itemContent(data, index))}</SList>;
};
