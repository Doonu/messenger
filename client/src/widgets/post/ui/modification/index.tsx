import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import BaseButton from '../../../../components/ui/buttons/baseButton';
import { useAppDispatch } from '../../../../hooks/redux';
import { removeEditPost } from '../../../../entities/post/post.slice';
import MainPostProfile from '../../../../components/ui/profiles/mainPost';
import { postTime } from '../../../../shared/util/time';
import { IPostAndDrag } from '../../model/shared';
import {
  DragInput,
  SAutosizeInput,
  SBottom,
  SButtons,
  SContainer,
  SDragField,
  SHead,
} from './modification.styled';
import { IAllFiles } from '../../../../shared/models/IPost';
import Photos from '../photos';
import Files from '../files';
import updatePost from '../../../../shared/api/post/updatePost';
import ModalBase from '../../../../components/navigation/modal/ui/ModalBase';
import { WarningCountPhotos } from '../../../../components/navigation/modal';
import { PreviewPhoto } from '../../../../components/navigation/modal/content/previewPhoto';
import ActionIcons from '../../../../features/actionIcons';
import addPendingList from '../../../../shared/api/files/addPendingList';
import clearTrash from '../../../../shared/api/files/clearTrash';
import { photosFilter } from '../../../../shared/util/filter';

interface IModification extends IPostAndDrag {
  allFiles: IAllFiles;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}

const Modification: FC<IModification> = ({
  post,
  isDraggablePhotoInPost,
  handlerChange,
  allFiles,
  setAllFiles,
}) => {
  const dispatch = useAppDispatch();

  const [isDraggablePhotoFocus, setIsDraggablePhotoFocus] = useState(false);

  const [content, setContent] = useState(post.content.join('\n'));

  const [modifyAllFiles, setModifyAllFiles] = useState<IAllFiles>({
    photos: allFiles.photos,
    files: allFiles.files,
  });

  const [isWarningMessage, setIsWarningMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [isPreviewPhoto, setIsPreviewPhoto] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlerRemoveEdit = () => {
    dispatch(clearTrash());
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

    if (modifyAllFiles.photos?.length + files.length > 5) {
      handlerChangeTitle('Вы можете прикрепить к посту не больше 5 фотографий');
      return;
    }

    await dispatch(addPendingList(Array.from(files)))
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
      <ModalBase onClose={() => setIsWarningMessage(false)} width="400px" open={isWarningMessage}>
        <WarningCountPhotos message={warningMessage} />
      </ModalBase>
      <ModalBase
        isFooter={false}
        width="max-content"
        onClose={() => setIsPreviewPhoto(false)}
        open={isPreviewPhoto}
        padding="0 0 0 0"
      >
        {modifyAllFiles.photos && (
          <PreviewPhoto
            setList={setAllFiles}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            list={modifyAllFiles.photos}
            description={content.toString().split('\n')}
          />
        )}
      </ModalBase>
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
              time={postTime(post.createdAt)}
              name={post.author.name}
              avatar={post.author.imgSubstitute}
            />
            <span>редактирование записи</span>
          </SHead>
          {!!modifyAllFiles.photos?.length && (
            <Photos
              setIsPreviewPhoto={setIsPreviewPhoto}
              setIsCurrentIndex={setCurrentIndex}
              data={modifyAllFiles}
              setData={setModifyAllFiles}
            />
          )}
          {!!modifyAllFiles.files?.length && (
            <Files data={modifyAllFiles} setData={setModifyAllFiles} />
          )}
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
              setData={setModifyAllFiles}
              data={modifyAllFiles}
              onTitle={handlerChangeTitle}
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
