import React, { FC } from 'react';
import { generateRadiusForPhoto } from '@shared/util';

import { IPhoto } from '../../model/IPhoto';
import { SContainer, SImg } from './Grid.styled';

const Grid: FC<IPhoto> = ({ photos }) => {
  return (
    <SContainer $length={photos.length}>
      {photos?.map(({ url, uid }, index) => {
        const radius = generateRadiusForPhoto(index, photos.length);
        return <SImg key={uid} $length={photos.length} $radius={radius} src={url} />;
      })}
    </SContainer>
  );
};

export default Grid;
