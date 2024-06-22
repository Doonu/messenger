import React, { FC } from 'react';
import { ContainerLoading, SLoader } from './loaderSmall.styled';

interface ILoaderSmall {
  size?: number;
}

const LoaderSmall: FC<ILoaderSmall> = ({ size = 40 }) => {
  return (
    <ContainerLoading>
      <SLoader size={size} />
    </ContainerLoading>
  );
};

export default LoaderSmall;
