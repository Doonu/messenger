import React from 'react';
import { IAllFiles } from '../../shared/models/IPost';
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, MouseEvent } from 'react';
import { SContainer, SDivider } from './actionIcons.styled';
import { Camera, Music, Poster, SFile, Video } from '../../shared/assets/icons';
import { useAppDispatch } from '../../hooks/redux';
import addPendingList from '../../shared/api/files/addPendingList';

interface IIconsProps {
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  onTitle: (title: string) => void;
  onActive?: () => void;
  isActive?: boolean;
}

const ActionIcons: FC<IIconsProps> = ({ setData, data, onActive, onTitle, isActive = true }) => {
  const dispatch = useAppDispatch();

  const cameraRef = useRef<any>(null);
  const fileRef = useRef<any>(null);

  const handleCamera = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    cameraRef.current.click();
  };

  const handleFile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    fileRef.current.click();
  };

  const handlerFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (data.files.length + files.length > 10) {
      onTitle('Вы можете прикрепить к посту не больше 10 файлов');
      return;
    }

    await dispatch(addPendingList(Array.from(files)))
      .unwrap()
      .then((files) => {
        setData((prev) => {
          return { ...prev, files: [...files, ...prev.files] };
        });
      });

    onActive && onActive();
  };

  const handlerPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (data.photos.length + files.length > 5) {
      onTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    await dispatch(addPendingList(Array.from(files)))
      .unwrap()
      .then((files) => {
        setData((prev) => {
          return { ...prev, photos: [...files, ...prev.photos] };
        });
      });

    onActive && onActive();
  };

  return (
    <SContainer>
      {isActive && (
        <>
          <div>
            <Poster />
          </div>
          <SDivider />
        </>
      )}
      <div onClick={handleCamera}>
        <Camera title={'Фото'}></Camera>
        <input
          accept="image/*"
          ref={cameraRef}
          multiple
          type="file"
          onChange={handlerPhoto}
          style={{ display: 'none' }}
        />
      </div>
      <div>
        <Video />
      </div>
      <div>
        <Music />
      </div>
      <div onClick={handleFile}>
        <SFile title={'Файл'} />
        <input
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
          ref={fileRef}
          multiple
          type="file"
          onChange={handlerFile}
          style={{ display: 'none' }}
        />
      </div>
    </SContainer>
  );
};

export default ActionIcons;
