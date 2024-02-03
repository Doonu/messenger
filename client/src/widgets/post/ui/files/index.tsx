import React, { Dispatch, FC, SetStateAction } from 'react';
import { IAllFiles } from '../../../../shared/models/IPost';
import { File } from '../../../../components/ui/file';
import { SFiles } from './files.styled';

interface IPhotosProps {
  data: IAllFiles;
  setData?: Dispatch<SetStateAction<IAllFiles>>;
  isModify?: boolean;
}

const Files: FC<IPhotosProps> = ({ data, setData, isModify = true }) => {
  const handlerFilterFiles = (id: string) => {
    const filterFiles = data.files.filter((file) => file.id !== id);
    setData && setData({ ...data, files: filterFiles });
  };

  return (
    <SFiles>
      {data.files.map((file) => (
        <File
          isModify={isModify}
          key={file.id}
          onDelete={() => handlerFilterFiles(file.id)}
          url={file.url}
          size={file.size}
          originalName={file.originalName}
        />
      ))}
    </SFiles>
  );
};

export default Files;
