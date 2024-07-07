import React from 'react';
import { LoaderSmall } from '@shared/components';

import { IHorizontalList } from '../model/IHorizontalList';
import { SList } from './horizontalList.styled';

export const HorizontalList = <T,>({ list, itemContent, loading }: IHorizontalList<T>) => {
  if (loading) {
    return <LoaderSmall />;
  }

  return <SList>{list.map((data, index) => itemContent(data, index))}</SList>;
};
