import React, { FC } from 'react';
import Word from 'shared/assets/icons/word';
import { SClose, SContainer, SLink, SText } from './file.styles';
import Pdf from 'shared/assets/icons/pdf';
import { IFilesPost } from 'shared/models/IPost';

interface IFile extends Pick<IFilesPost, 'originalName' | 'size' | 'url'> {
  onDelete: () => void;
  isModify?: boolean;
}

const File: FC<IFile> = ({ url, onDelete, originalName, isModify = true }) => {
  let arrayNames = url.split('.');
  let isIcons = arrayNames[arrayNames.length - 1];
  let src = `http://localhost:5000/${url}`;

  return (
    <SContainer title={originalName}>
      {isModify && <SClose onClick={onDelete}>X</SClose>}
      <SLink draggable="false" target="_blank" download href={src}>
        {(isIcons === 'docx' || isIcons === 'doc') && <Word />}
        {isIcons === 'pdf' && <Pdf />}

        <SText>{originalName ? originalName : isIcons}</SText>
      </SLink>
    </SContainer>
  );
};

export default File;
