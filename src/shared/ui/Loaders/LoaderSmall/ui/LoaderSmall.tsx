import React, { FC } from 'react';

import { ContainerLoading, SLoader } from './loaderSmall.styles';
import { LoaderSmallProps } from '../model/loaderSmall.types';

export const LoaderSmall: FC<LoaderSmallProps> = ({ size = 40 }) => {
  return (
    <ContainerLoading>
      <SLoader size={size} />
    </ContainerLoading>
  );
};
