import React, { ChangeEvent, FC, useState } from 'react';
import { BaseButton, MainPost, Modal, WarningCountPhotos } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { removeEditPost } from '@entities/post';
import { postTime, extensionPhotoList, photosFilter } from '@shared/util';
import { IAllFiles } from '@shared/models';
import { updatePost, addPendingList, clearTrash } from '@shared/api';
import { PreviewPhoto } from '@features/PreviewPhoto';
import { ActionIcons } from '@features/ActionIcons';
import { Files } from '@features/Files';
import { Photos } from '@features/Photos';

import {
  DragInput,
  SAutosizeInput,
  SBottom,
  SButtons,
  SContainer,
  SDragField,
  SHead,
} from './modification.styled';
import { IModification } from './model/IModification';

const Modification: FC<IModification> = ({
  post,
  isDraggablePhotoInPost,
  handlerChange,
  allFiles,
  setAllFiles,
}) => {
  const dispatch = useAppDispatch();

  const [modifyAllFiles, setModifyAllFiles] = useState<IAllFiles>({
    photos: allFiles.photos,
    files: allFiles.files,
  });

  const [isDraggablePhotoFocus, setIsDraggablePhotoFocus] = useState(false);

  const [content, setContent] = useState(post.content.join('\n'));

  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const [isWarningMessage, setIsWarningMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [isPreviewPhoto, setIsPreviewPhoto] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlerRemoveEdit = () => {
    dispatch(clearTrash({ status: 2 }));
    dispatch(removeEditPost());
  };

  const handlerChangeTitle = (title: string) => {
    setWarningMessage(title);
    setIsWarningMessage(true);
  };

  const handlerPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    handlerChange();

    const { files } = e.target;
    if (!files) return;

    const filteredPhoto = Array.from(files).filter((file) =>
      extensionPhotoList.includes(file.name.split('.')[file.name.split('.').length - 1])
    );

    if ((modifyAllFiles.photos?.length || 0) + filteredPhoto.length > 5) {
      handlerChangeTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    dispatch(addPendingList({ files: Array.from(filteredPhoto), status: 2 }))
      .unwrap()
      .then((fetchFiles) => {
        setModifyAllFiles((prev) => {
          return { ...prev, photos: [...fetchFiles, ...prev.photos] };
        });
      })
      .catch(() => {});
  };

  const handlerPhotoFocus = () => {
    setIsDraggablePhotoFocus((prev) => !prev);
  };

  const handleSubmit = () => {
    dispatch(
      updatePost({
        content: content.toString().split('\n'),
        files: [...modifyAllFiles.files, ...modifyAllFiles.photos],
        view: post.view,
        isDisabledComments: post.isDisabledComments,
        id: post.id,
        status: 2,
      })
    )
      .unwrap()
      .then((fetchPost) => {
        handlerRemoveEdit();

        const photos = photosFilter({ photos: fetchPost.files, type: 'Photo' });
        const files = photosFilter({ photos: fetchPost.files, type: 'file' });

        setAllFiles({ photos: photos || [], files: files || [] });
      })
      .catch(() => {});
  };

  return (
    <SContainer onDragEnterCapture={handlerPhotoFocus} onDragLeaveCapture={handlerPhotoFocus}>
      <Modal onClose={() => setIsWarningMessage(false)} width="400px" open={isWarningMessage}>
        <WarningCountPhotos message={warningMessage} />
      </Modal>
      <Modal
        isFooter={false}
        width="max-content"
        onClose={() => setIsPreviewPhoto(false)}
        open={isPreviewPhoto}
        padding="0 0 0 0"
      >
        {modifyAllFiles.photos && (
          <PreviewPhoto
            setList={setModifyAllFiles}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            list={modifyAllFiles.photos}
            description={content.toString().split('\n')}
          />
        )}
      </Modal>
      {isDraggablePhotoInPost && <DragInput multiple type="file" onChange={handlerPhoto} />}
      {isDraggablePhotoInPost && (
        <SDragField isFocus={isDraggablePhotoFocus}>
          {isDraggablePhotoFocus
            ? 'Претащите сюда свои фотографии'
            : 'Отпустите кнопку мышки чтоб закрепить фотографии'}
        </SDragField>
      )}
      {!isDraggablePhotoInPost && (
        <>
          <SHead>
            <MainPost
              status={post.author.statusConnected}
              time={postTime(post.createdAt)}
              name={post.author.name}
              avatar={post.author.imgSubstitute}
              id={post.author.id}
            />
            <span>редактирование записи</span>
          </SHead>

          <Photos
            loader={loadingPhotos}
            setIsPreviewPhoto={setIsPreviewPhoto}
            setCurrentIndex={setCurrentIndex}
            data={modifyAllFiles}
            setData={setModifyAllFiles}
          />

          <Files data={modifyAllFiles} setData={setModifyAllFiles} loader={loadingFiles} />

          <SAutosizeInput
            onChange={(e) => setContent(e.target.value)}
            value={content}
            draggable="false"
            minRows={2}
            maxRows={5}
            isDrag
            $position={false}
          />
          <SBottom>
            <ActionIcons
              setLoadingFiles={setLoadingFiles}
              setLoadingPhoto={setLoadingPhotos}
              setData={setModifyAllFiles}
              data={modifyAllFiles}
              onTitle={handlerChangeTitle}
              statusPhoto={2}
            />
            <SButtons>
              <BaseButton bgTransparent onClick={handlerRemoveEdit}>
                Отмена
              </BaseButton>
              <BaseButton onClick={handleSubmit}>Сохранить</BaseButton>
            </SButtons>
          </SBottom>
        </>
      )}
    </SContainer>
  );
};

export default Modification;
