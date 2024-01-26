import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

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
import Files from '../files';
import Photos from '../photos';
import Content from '../content';
import Features from '../features';
import { IAllFiles } from '../../../../shared/models/IPost';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorPost } from '../../../../entities/post/post.selectors';
import { useOutsideClick } from '../../../../hooks/outside';
import ActionIcons from '../../../../features/actionIcons';
import BaseButton from '../../../../components/ui/buttons/baseButton';
import addPendingList from '../../../../shared/api/files/addPendingList';

interface IContainerFormProps {
  isDraggablePhoto: boolean;
  handlerChange: () => void;
  data: IAllFiles;
  setData: Dispatch<SetStateAction<IAllFiles>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const ContainerForm: FC<IContainerFormProps> = ({
  isDraggablePhoto,
  handlerChange,
  data,
  setData,
  setCurrentIndex,
}) => {
  const dispatch = useAppDispatch();

  const { values, setFieldValue } = useFormikContext<IPost>();

  const { posts, editedPost } = useAppSelector(selectorPost);

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

  const handlerPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    handlerChange();
    const files = e.target.files;
    if (!files) return;

    if (data.photos.length + files.length > 5) {
      handlerChangeTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    await dispatch(addPendingList(Array.from(files)))
      .unwrap()
      .then((files) => {
        setData((prev) => {
          return { ...prev, photos: [...files, ...prev.photos] };
        });
      })
      .catch(() => {});

    handlerActive();
  };

  const handlerPhotoFocus = () => {
    isEditPost && setFieldValue('isDraggablePhotoFocus', !values.isDraggablePhotoFocus);
  };

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
          {!!data.photos.length && (
            <Photos setCurrentIndex={setCurrentIndex} data={data} setData={setData} />
          )}
          {!!data.files.length && <Files data={data} setData={setData} />}

          {data.photos.length > 1 && <Features />}
          <SContainerIcons $position={values.isActive}>
            <ActionIcons
              setData={setData}
              data={data}
              onActive={handlerActive}
              onTitle={handlerChangeTitle}
              isActive={values.isActive}
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
