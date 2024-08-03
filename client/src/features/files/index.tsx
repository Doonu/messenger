import React, { FC } from 'react';
import { HorizontalList, File } from '@shared/components';
import { UploadFile } from 'antd';

import { IFilesProps } from './model/IFiles';

export const Files: FC<IFilesProps> = ({ data, setData, loader = false, isModify = true }) => {
  const handlerFilterFiles = (uid: string) => {
    const filterFiles = data.files.filter((file) => file.uid !== uid);

    if (setData) {
      setData({ ...data, files: filterFiles });
    }
  };

  return (
    <HorizontalList<UploadFile>
      list={data.files}
      loading={loader}
      itemContent={(file) => (
        <File isModify={isModify} file={file} onDelete={() => handlerFilterFiles(file.uid)} />
      )}
    />
  );
};
