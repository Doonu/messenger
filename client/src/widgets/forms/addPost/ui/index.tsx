import React, { useState } from 'react';
import { Formik, FormikConfig } from 'formik';
import { Form } from 'antd';
import { IAllFiles, IPost } from '@shared/models';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { postCreate } from '@shared/api';
import { Modal, WarningCountPhotos } from '@shared/components';
import { PreviewPhoto } from '@features/PreviewPhoto';
import { switchWarningPost, selectorEditedPost, selectorPost } from '@entities/post';

import { initialValues } from '../lib/initialValues';
import ContainerForm from './containerForm/ContainerForm';

// TODO: Сделать контайнер и сделать только в нем опасити
// TODO: Сделать мазайку для картинок
// TODO: Перенести в Slice
// TODO: Подумать -> создать в entities папочку с сохраненными формами(savedFilters/Index)

export const AddPost = () => {
  const dispatch = useAppDispatch();

  const initialFilesState = { photos: [], files: [] };

  const editedPost = useAppSelector(selectorEditedPost);
  const posts = useAppSelector(selectorPost);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewPhoto, setIsPreviewPhoto] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isWarningModal, setIsWarningModal] = useState(false);
  const [warningModalTitle, setWarningModalTitle] = useState('');
  const [allFiles, setAllFiles] = useState<IAllFiles>(initialFilesState);

  const isEditPost = posts.find((post) => post.id === editedPost?.id);

  const handlerSubmit: FormikConfig<IPost>['onSubmit'] = (values, { resetForm, setFieldValue }) => {
    if (isEditPost) {
      dispatch(switchWarningPost(true));
      return;
    }

    setFieldValue('isActive', false);

    dispatch(
      postCreate({
        content: values.content.toString().split('\n'),
        files: [...allFiles.files, ...allFiles.photos],
        isDisabledComments: values.isDisabledComments,
        view: values.view,
        status: 1,
      })
    );

    setIsActive(false);
    setAllFiles(initialFilesState);

    resetForm();
  };

  return (
    <Formik<IPost> initialValues={initialValues} onSubmit={handlerSubmit}>
      {({ values, setFieldValue, handleSubmit }) => (
        <Form encType="multipart/form-data" layout="vertical" onFinish={handleSubmit}>
          <Modal
            onClose={() => setFieldValue('isWarningModal', false)}
            width="400px"
            open={isWarningModal}
          >
            <WarningCountPhotos message={warningModalTitle} />
          </Modal>
          <Modal
            isFooter={false}
            width="max-content"
            onClose={() => setIsPreviewPhoto(false)}
            open={isPreviewPhoto}
            padding="0 0 0 0"
          >
            {allFiles.photos && (
              <PreviewPhoto
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                description={values.content.toString().split('\n')}
                photos={allFiles.photos}
              />
            )}
          </Modal>
          {allFiles && (
            <ContainerForm
              setIsPreviewPhoto={setIsPreviewPhoto}
              setCurrentIndex={setCurrentIndex}
              allFiles={allFiles}
              setAllFiles={setAllFiles}
              isActive={isActive}
              setIsActive={setIsActive}
              setIsWarningModal={setIsWarningModal}
              setWarningModalTitle={setWarningModalTitle}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};
