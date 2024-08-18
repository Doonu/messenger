import React, { FC, useState } from 'react';
import { useFormikContext } from 'formik';
import { useAppSelector, useOutsideClick } from '@shared/hooks';
import { selectorProfileLoader } from '@entities/profile';
import { ActionFiles } from '@features/ActionIcons';
import { BaseButton } from '@shared/components';
import { Files } from '@features/Files';
import { Photos } from '@features/Photos';
import { IPost } from '@shared/models';

import { SkeletonAddPost } from '../skeleton';
import Features from '../features';
import Content from '../content';
import { SContainer, SContainerIcons, SSubmit } from './containerForm.styled';
import { IContainerFormProps } from '../../model/IPost';
import Settings from '../settings/Settings';

const ContainerForm: FC<IContainerFormProps> = ({
  allFiles,
  setAllFiles,
  setCurrentIndex,
  setIsPreviewPhoto,
  isActive,
  setIsActive,
  setWarningModalTitle,
  setIsWarningModal,
}) => {
  const { values } = useFormikContext<IPost>();

  const loaderProfile = useAppSelector(selectorProfileLoader);

  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const isCorrect = !values.content.length && !allFiles.photos.length && !allFiles.files.length;

  const ref = useOutsideClick(() => {
    if (isCorrect) setIsActive(false);
  });

  const handlerChangeTitle = (title: string) => {
    setWarningModalTitle(title);
    setIsWarningModal(true);
  };

  const handlerActive = () => {
    setIsActive(true);
  };

  if (loaderProfile) {
    return <SkeletonAddPost />;
  }

  return (
    <SContainer ref={ref} onClick={() => setIsActive(true)} $position={isActive}>
      <Content isActive={isActive} />

      <Photos
        data={allFiles}
        setData={setAllFiles}
        setCurrentIndex={setCurrentIndex}
        loader={loadingPhotos}
        setIsPreviewPhoto={setIsPreviewPhoto}
      />

      <Files data={allFiles} setData={setAllFiles} loader={loadingFiles} />

      {allFiles.photos.length > 1 && <Features />}
      <SContainerIcons $position={isActive}>
        <ActionFiles
          setData={setAllFiles}
          data={allFiles}
          onActive={handlerActive}
          onTitle={handlerChangeTitle}
          isActive={isActive}
          statusPhoto={1}
        />
        {isActive && (
          <SSubmit>
            {!isCorrect && <Settings />}
            <BaseButton htmlType="submit" disabled={isCorrect} height="30px">
              Опубликовать
            </BaseButton>
          </SSubmit>
        )}
      </SContainerIcons>
    </SContainer>
  );
};

export default ContainerForm;
