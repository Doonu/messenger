import React, { Dispatch, FC, SetStateAction } from 'react';
import { IAllFiles } from '../../../../shared/models/IPost';
import { File } from '../../../../components/custom/file';
import { SFiles } from './files.styled';
import { LoaderSmall } from '../../../../components/ui/loaders';

interface IPhotosProps {
  data: IAllFiles;
  setData?: Dispatch<SetStateAction<IAllFiles>>;
  isModify?: boolean;
  loader?: boolean;
}

const Files: FC<IPhotosProps> = ({ data, setData, isModify = true, loader = false }) => {
  const handlerFilterFiles = (id: string) => {
    const filterFiles = data.files.filter((file) => file.id !== id);
    setData && setData({ ...data, files: filterFiles });
  };

  if (loader) {
    return <LoaderSmall />;
  }

  return (
    <>
      {!!data.files?.length && !loader && (
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
      )}
    </>
  );
};

export default Files;
