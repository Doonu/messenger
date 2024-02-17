import React, { FC, useState } from 'react';

import { Formik } from 'formik';
import { Form } from 'antd';
import ContainerForm from './containerForm/ContainerForm';
import { IPost } from '../model/IPost';
import { initialValues } from '../lib/initialValues';
import { IAllFiles } from '../../../shared/models/IPost';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import postCreate from '../../../shared/api/post/postCreate';
import ModalBase from '../../../components/navigation/modal/ui/ModalBase';
import { WarningCountPhotos } from '../../../components/navigation/modal';
import { PreviewPhoto } from '../../../components/navigation/modal/content/previewPhoto';
import { switchWarningPost } from '../../../entities/post/post.slice';
import { selectorEditedPost, selectorPost } from '../../../entities';

//TODO: Сделать контайнер и сделать только в нем опасити
//TODO: Сделать мазайку для картинок
//TODO: Перенести в slice
//TODO: Подумать -> создать в entities папочку с сохраненными формами(savedFilters/addPost)

interface IPostProps {
  isDraggablePhoto: boolean;
  handlerChange: () => void;
}

const AddPost: FC<IPostProps> = ({ isDraggablePhoto, handlerChange }) => {
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
          <ModalBase
            onClose={() => setFieldValue('isWarningModal', false)}
            width="400px"
            open={values.isWarningModal}
          >
            <WarningCountPhotos message={values.isWarningModalTitle} />
          </ModalBase>
          <ModalBase
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
          </ModalBase>
          {allFiles && (
            <ContainerForm
              setIsPreviewPhoto={setIsPreviewPhoto}
              setCurrentIndex={setCurrentIndex}
              setData={setAllFiles}
              data={allFiles}
              isDraggablePhoto={isDraggablePhoto}
              handlerChange={handlerChange}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddPost;
