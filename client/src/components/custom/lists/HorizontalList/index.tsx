import React from 'react';
import { IHorizontalList } from './model/IHorizontalList';
import { SList } from './horizontalList.styled';
import { LoaderSmall } from 'components/ui/loaders';

const HorizontalList = <T, K>({ list, itemContent, loading }: IHorizontalList<T, K>) => {
  if (loading) {
    return <LoaderSmall />;
  }

  return <SList>{list.map((data, index) => itemContent(data, index))}</SList>;
};

export default HorizontalList;
