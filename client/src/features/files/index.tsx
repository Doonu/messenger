import React, { FC } from 'react';
import HorizontalList from 'components/custom/lists/HorizontalList';
import { IFilesPost } from 'shared/models/IPost';
import { File } from 'components/custom/file';
import { IFilesProps } from './model/IFiles';

const Files: FC<IFilesProps> = ({ data, setData, loader = false, isModify = true }) => {
  const handlerFilterFiles = (id: string) => {
    const filterFiles = data.files.filter((file) => file.id !== id);
    setData && setData({ ...data, files: filterFiles });
  };

  return (
    <>
      <HorizontalList<IFilesPost, IFilesPost>
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
    </>
  );
};

export default Files;
