import React, { Dispatch, FC, SetStateAction } from 'react';
import { SFiles } from './files.styled';
import { IAllFiles } from '../../../../shared/models/IPost';
import { File } from '../../../../components/custom/file';
import { ContainerLoading } from '../containerForm/containerForm.styled';
import { LoaderSmall } from '../../../../components/ui/loaders';

interface IFilesProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  loader: boolean;
}

const Files: FC<IFilesProps> = ({ data, setData, loader }) => {
  const handlerFilterFiles = (id: string) => {
    const filterFiles = data.files.filter((file) => file.id !== id);
    setData({ ...data, files: filterFiles });
  };

  if (loader) {
    return (
      <ContainerLoading>
        <LoaderSmall />
      </ContainerLoading>
    );
  }

  return (
    <>
      {!!data.files.length && !loader && (
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
      )}
    </>
  );
};

export default Files;
