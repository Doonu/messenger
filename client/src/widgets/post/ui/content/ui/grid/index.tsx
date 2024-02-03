import React, { FC } from 'react';
import { IPhoto } from '../../model/IPhoto';
import { SContainer, SImg } from './Grid.styled';

const Grid: FC<IPhoto> = ({ photos }) => {
  return (
    <SContainer $length={photos.length}>
      {photos?.map(({ url, id }, index) => (
        <SImg
          key={id}
          $length={photos.length}
          $index={index}
          style={{ width: '100%', height: '100%' }}
          src={url}
        ></SImg>
      ))}
    </SContainer>
  );
};

export default Grid;
