import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { Form } from 'antd';
import { IAllFiles } from '@shared/models';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import { postCreate } from '@shared/api';
import { Modal, WarningCountPhotos } from '@shared/components';
import { PreviewPhoto } from '@features/PreviewPhoto';
import { switchWarningPost, selectorEditedPost, selectorPost } from '@entities/post';

import { initialValues } from '../lib/initialValues';
import { IPost, IPostProps } from '../model/IPost';
import ContainerForm from './containerForm/ContainerForm';

// TODO: Сделать контайнер и сделать только в нем опасити
// TODO: Сделать мазайку для картинок
// TODO: Перенести в Slice
// TODO: Подумать -> создать в entities папочку с сохраненными формами(savedFilters/Index)

export const AddPost: FC<IPostProps> = ({ isDraggablePhoto, handlerSetDraggablePhoto }) => {
  const dispatch = useAppDispatch();

  const editedPost = useAppSelector(selectorEditedPost);
  const posts = useAppSelector(selectorPost);

  const [allFiles, setAllFiles] = useState<IAllFiles>({ photos: [], files: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewPhoto, setIsPreviewPhoto] = useState(false);

  const isEditPost = posts.find((post) => post.id === editedPost?.id);

  return (
    <Formik<IPost>
      initialValues={initialValues}
      onSubmit={(values, { resetForm, setFieldValue }) => {
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

        setAllFiles({ photos: [], files: [] });
        resetForm();
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form encType="multipart/form-data" layout="vertical" onFinish={handleSubmit}>
          <Modal
            onClose={() => setFieldValue('isWarningModal', false)}
            width="400px"
            open={values.isWarningModal}
          >
            <WarningCountPhotos message={values.isWarningModalTitle} />
          </Modal>
          <Modal
            isFooter={false}
            width="max-content"
            onClose={() => setIsPreviewPhoto(false)}
            open={isPreviewPhoto}
            padding="0 0 0 0"
          >
            {allFiles?.photos && (
              <PreviewPhoto
                setList={setAllFiles}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                list={allFiles.photos}
                description={values.content.toString().split('\n')}
              />
            )}
          </Modal>
          {allFiles && (
            <ContainerForm
              setIsPreviewPhoto={setIsPreviewPhoto}
              setCurrentIndex={setCurrentIndex}
              setData={setAllFiles}
              data={allFiles}
              isDraggablePhoto={isDraggablePhoto}
              handlerChange={handlerSetDraggablePhoto}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};
