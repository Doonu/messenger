import React, { FC } from 'react';
import { Word, Pdf } from '@shared/assets';

import { SClose, SContainer, SLink, SText } from './file.styles';
import { IFile } from '../model/IFile';

// TODO: что-то с этим сделать http://localhost:5000
export const File: FC<IFile> = ({ url, onDelete, originalName, isModify = true }) => {
  const arrayNames = url.split('.');
  const isIcons = arrayNames[arrayNames.length - 1];
  const src = `http://localhost:5000/${url}`;

  return (
    <SContainer title={originalName}>
      {isModify && <SClose onClick={onDelete}>X</SClose>}
      <SLink draggable="false" target="_blank" download href={src}>
        {(isIcons === 'docx' || isIcons === 'doc') && <Word />}
        {isIcons === 'pdf' && <Pdf />}

        <SText>{originalName || isIcons}</SText>
      </SLink>
    </SContainer>
  );
};
