import React, { FC, useState } from 'react';

import {
  SBeautPen,
  SClose,
  SCloseContainer,
  SContainerIcons,
  SContainerPhoto,
  SImg,
  SMagnifier,
} from './photo.styles';
import { PhotoTypes } from '../model/photo.types';

export const Photo: FC<PhotoTypes> = ({ url, onDelete, onClick }) => {
  const [hoveredPhoto, setHoveredPhoto] = useState(false);

  const handleHovered = () => setHoveredPhoto((prev) => !prev);

  return (
    <SContainerPhoto onMouseEnter={handleHovered} onMouseLeave={handleHovered}>
      {hoveredPhoto && (
        <SCloseContainer>
          <SClose onClick={onDelete} />
        </SCloseContainer>
      )}
      {hoveredPhoto && (
        <SContainerIcons>
          <SMagnifier onClick={onClick} title="Открыть" />
          <SBeautPen title="Фоторедактор" />
        </SContainerIcons>
      )}
      <SImg draggable="false" src={url} alt="" />
    </SContainerPhoto>
  );
};
