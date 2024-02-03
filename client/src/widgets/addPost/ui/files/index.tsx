import React, { Dispatch, FC, SetStateAction } from 'react';
import { SFiles } from './files.styled';
import { IAllFiles } from '../../../../shared/models/IPost';
import { File } from '../../../../components/custom/file';

interface IFilesProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
}

const Files: FC<IFilesProps> = ({ data, setData }) => {
  const handlerFilterFiles = (id: string) => {
    const filterFiles = data.files.filter((file) => file.id !== id);
    setData({ ...data, files: filterFiles });
  };

  return (
    <SFiles>
      {data.files.map(({ id, url, originalName, size }) => (
        <File
          originalName={originalName}
          size={size}
          key={id}
          url={url}
          onDelete={() => handlerFilterFiles(id)}
        />
      ))}
    </SFiles>
  );
};

export default Files;
