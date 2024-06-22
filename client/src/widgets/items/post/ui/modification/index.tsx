import React, { ChangeEvent, FC, useState } from 'react';
import BaseButton from 'shared/components/ui/buttons/baseButton';
import { useAppDispatch } from 'hooks/redux';
import { removeEditPost } from 'entities/post/post.slice';
import MainPostProfile from 'shared/components/custom/profiles/mainPost';
import { postTime } from 'shared/util/time';
import {
  DragInput,
  SAutosizeInput,
  SBottom,
  SButtons,
  SContainer,
  SDragField,
  SHead,
} from './modification.styled';
import { IAllFiles } from 'shared/models/IPost';
import { updatePost, addPendingList, clearTrash } from 'shared/api';
import Index from 'shared/components/navigation/modal/ui';
import { WarningCountPhotos } from 'shared/components/custom/warningCountPhotos';
import { PreviewPhoto } from 'features/previewPhoto';
import ActionIcons from 'features/actionIcons';
import { extensionPhotoList, photosFilter } from 'shared/util/filter';
import Files from 'features/files';
import Photos from 'features/photos';
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

    const files = e.target.files;
    if (!files) return;

    const filteredPhoto = Array.from(files).filter((file) =>
      extensionPhotoList.includes(file.name.split('.')[file.name.split('.').length - 1])
    );

    if (modifyAllFiles.photos?.length + filteredPhoto.length > 5) {
      handlerChangeTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    dispatch(addPendingList({ files: Array.from(filteredPhoto), status: 2 }))
      .unwrap()
      .then((files) => {
        setModifyAllFiles((prev) => {
          return { ...prev, photos: [...files, ...prev.photos] };
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
      .then((post) => {
        handlerRemoveEdit();

        const photos = photosFilter({ photos: post.files, type: 'photo' });
        const files = photosFilter({ photos: post.files, type: 'file' });

        setAllFiles({ photos: photos || [], files: files || [] });
      })
      .catch(() => {});
  };

  return (
    <SContainer onDragEnterCapture={handlerPhotoFocus} onDragLeaveCapture={handlerPhotoFocus}>
      <Index onClose={() => setIsWarningMessage(false)} width="400px" open={isWarningMessage}>
        <WarningCountPhotos message={warningMessage} />
      </Index>
      <Index
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
      </Index>
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
            <MainPostProfile
              status={post.author.statusConnected}
              statusTime={post.author.timeConnected}
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
            isDrag={true}
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
            ></ActionIcons>
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
