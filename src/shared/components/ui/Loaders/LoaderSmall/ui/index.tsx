import React, { FC } from 'react';

import { ContainerLoading, SLoader } from './loaderSmall.styled';
import { LoaderSmallProps } from '../model/ILoaderSmall';

export const LoaderSmall: FC<LoaderSmallProps> = ({ size = 40 }) => {
  return (
    <ContainerLoading>
      <SLoader size={size} />
    </ContainerLoading>
  );
};
