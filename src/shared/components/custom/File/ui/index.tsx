import React, { FC } from 'react';
import { Word, Pdf } from '@shared/assets';

import { SClose, SContainer, SLink, SText } from './file.styles';
import { IFile } from '../model/IFile';

export const File: FC<IFile> = ({ onDelete, isModify = true, file }) => {
  const arrayNames = file.name.split('.');
  const isIcons = arrayNames[arrayNames.length - 1];
  const src = file.url ? file.url : URL.createObjectURL(file.originFileObj as File);

  return (
    <SContainer title={file.fileName}>
      {isModify && <SClose onClick={onDelete}>X</SClose>}
      <SLink draggable="false" target="_blank" download href={src}>
        {(isIcons === 'docx' || isIcons === 'doc') && <Word />}
        {isIcons === 'pdf' && <Pdf />}

        <SText>{file.fileName || isIcons}</SText>
      </SLink>
    </SContainer>
  );
};
