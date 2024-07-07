import React, { FC } from 'react';
import { HorizontalList, File } from '@shared/components';
import { IFilesPost } from '@shared/models';

import { IFilesProps } from './model/IFiles';

export const Files: FC<IFilesProps> = ({ data, setData, loader = false, isModify = true }) => {
  const handlerFilterFiles = (id: string) => {
    const filterFiles = data.files.filter((file) => file.id !== id);

    if (setData) {
      setData({ ...data, files: filterFiles });
    }
  };

  return (
    <HorizontalList<IFilesPost>
      list={data.files}
      loading={loader}
      itemContent={({ url, originalName, size, id }) => (
        <File
          isModify={isModify}
          originalName={originalName}
          size={size}
          key={id}
          url={url}
          onDelete={() => handlerFilterFiles(id)}
        />
      )}
    />
  );
};
