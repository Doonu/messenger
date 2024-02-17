import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';

import Settings from '../settings/Settings';
import { useFormikContext } from 'formik';
import { IPost } from '../../model/IPost';
import {
  SContainer,
  SContainerIcons,
  SDragField,
  SSubmit,
  DragInput,
} from './containerForm.styled';
import Content from '../content';
import Features from '../features';
import { IAllFiles } from '../../../../shared/models/IPost';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorEditedPost, selectorPost, selectorProfileLoader } from '../../../../entities';
import { useOutsideClick } from '../../../../hooks/outside';
import ActionIcons from '../../../../features/actionIcons';
import BaseButton from '../../../../components/ui/buttons/baseButton';
import addPendingList from '../../../../shared/api/files/addPendingList';
import { extensionPhotoList } from '../../../../shared/util/filter';
import SkeletonAddPost from '../skeleton';
import Files from '../../../../features/files';
import Photos from '../../../../features/photos';

interface IContainerFormProps {
  isDraggablePhoto: boolean;
  handlerChange: () => void;
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPreviewPhoto: Dispatch<SetStateAction<boolean>>;
}

const ContainerForm: FC<IContainerFormProps> = ({
  isDraggablePhoto,
  handlerChange,
  data,
  setData,
  setCurrentIndex,
  setIsPreviewPhoto,
}) => {
  const dispatch = useAppDispatch();

  const { values, setFieldValue } = useFormikContext<IPost>();

  const editedPost = useAppSelector(selectorEditedPost);
  const posts = useAppSelector(selectorPost);
  const loaderProfile = useAppSelector(selectorProfileLoader);

  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const isCorrect = !values.content.length && !data.photos.length && !data.files.length;
  const isEditPost = posts.find((post) => post.id === editedPost?.id);

  const ref = useOutsideClick(() => {
    if (isCorrect) setFieldValue('isActive', false);
  });

  const handlerChangeTitle = (title: string) => {
    setFieldValue('isWarningModalTitle', title);
    setFieldValue('isWarningModal', true);
  };

  const handlerActive = () => {
    setFieldValue('isActive', true);
  };

  const handlerPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    handlerChange();
    handlerActive();

    const files = e.target.files;

    if (!files) return;

    const filteredPhoto = Array.from(files).filter((file) =>
      extensionPhotoList.includes(file.name.split('.')[file.name.split('.').length - 1])
    );

    if (data.photos.length + filteredPhoto.length > 5) {
      handlerChangeTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    setLoadingPhotos(true);

    dispatch(addPendingList({ files: Array.from(filteredPhoto), status: 1 }))
      .unwrap()
      .then((files) => {
        setData((prev) => {
          return { ...prev, photos: [...files, ...prev.photos] };
        });
      })
      .catch(() => {})
      .finally(() => {
        setLoadingPhotos(false);
      });
  };

  const handlerPhotoFocus = () => {
    isEditPost && setFieldValue('isDraggablePhotoFocus', !values.isDraggablePhotoFocus);
  };

  if (loaderProfile) {
    return <SkeletonAddPost />;
  }

  return (
    <SContainer
      onDragEnterCapture={handlerPhotoFocus}
      onDragLeaveCapture={handlerPhotoFocus}
      ref={ref}
      onClick={() => setFieldValue('isActive', true)}
      $position={values.isActive}
      $isDraggable={isDraggablePhoto}
    >
      {isDraggablePhoto && <DragInput multiple type="file" onChange={handlerPhoto} />}
      {isDraggablePhoto && (
        <SDragField isFocus={values.isDraggablePhotoFocus}>
          {values.isDraggablePhotoFocus
            ? 'Претащите сюда свои фотографии'
            : 'Отпустите кнопку мышки чтоб закрепить фотографии'}
        </SDragField>
      )}
      {!isDraggablePhoto && (
        <>
          <Content />

          <Photos
            loader={loadingPhotos}
            setCurrentIndex={setCurrentIndex}
            data={data}
            setData={setData}
            setIsPreviewPhoto={setIsPreviewPhoto}
          />

          <Files data={data} setData={setData} loader={loadingFiles} />

          {data.photos.length > 1 && <Features />}
          <SContainerIcons $position={values.isActive}>
            <ActionIcons
              setLoadingFiles={setLoadingFiles}
              setLoadingPhoto={setLoadingPhotos}
              setData={setData}
              data={data}
              onActive={handlerActive}
              onTitle={handlerChangeTitle}
              isActive={values.isActive}
              statusPhoto={1}
            />
            {values.isActive && (
              <SSubmit>
                {!isCorrect && <Settings />}
                <BaseButton htmlType="submit" disabled={isCorrect} height="30px">
                  Опубликовать
                </BaseButton>
              </SSubmit>
            )}
          </SContainerIcons>
        </>
      )}
    </SContainer>
  );
};

export default ContainerForm;
