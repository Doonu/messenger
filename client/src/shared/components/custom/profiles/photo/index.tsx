import React, { FC } from 'react';
import { SContainer, SImg } from './photo.styled';
import Online from 'shared/components/custom/signals/online';

interface IPhotoProfile {
  img: string;
  name: string;
  status?: boolean;
  statusTime?: number;
  size?: number;
  isAbsolute?: boolean;
  top?: number;
  left?: number;
  fontSize?: number;
}

const PhotoProfile: FC<IPhotoProfile> = ({
  img,
  isAbsolute = false,
  size = 40,
  name,
  top = 20,
  left = 20,
  fontSize = 22,
  status,
}) => {
  const isName = name && img[0] === '#' && name[0];

  if (img?.[0] !== '#') {
    return <SImg $size={size} src={img} $isAbsolute={isAbsolute} $top={top} $left={left} />;
  }
  return (
    <SContainer
      $fontSize={fontSize}
      $size={size}
      $color={img}
      $isAbsolute={isAbsolute}
      $top={top}
      $left={left}
    >
      {isName && name[0]}
      {status && <Online />}
    </SContainer>
  );
};

export default PhotoProfile;
