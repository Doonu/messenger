import React, { FC } from 'react';
import { IPhoto } from '../../model/IPhoto';
import { SContainer, SImg } from './Grid.styled';
import { generateRadiusForPhoto } from 'shared/util/generateRadiusForPhoto';

const Grid: FC<IPhoto> = ({ photos }) => {
  return (
    <SContainer $length={photos.length}>
      {photos?.map(({ url, id }, index) => {
        const radius = generateRadiusForPhoto(index, photos.length);
        return (
          <SImg
            key={id}
            $length={photos.length}
            $radius={radius}
            src={`http://localhost:3000/${url}`}
          ></SImg>
        );
      })}
    </SContainer>
  );
};

export default Grid;
