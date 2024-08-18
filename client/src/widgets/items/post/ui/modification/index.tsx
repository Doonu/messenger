import React, { FC, useState } from 'react';
import { BaseButton, MainPost, Modal, WarningCountPhotos } from '@shared/components';
import { useAppDispatch } from '@shared/hooks';
import { removeEditPost } from '@entities/post';
import { postTime, photosFilter } from '@shared/util';
import { IAllFiles } from '@shared/models';
import { updatePost } from '@shared/api';
import { PreviewPhoto } from '@features/PreviewPhoto';
import { ActionFiles } from '@features/ActionIcons';
import { Files } from '@features/Files';
import { Photos } from '@features/Photos';

import { SAutosizeInput, SBottom, SButtons, SContainer, SHead } from './modification.styled';
import { IModification } from './model/IModification';

const Modification: FC<IModification> = ({ post, allFiles, setAllFiles }) => {
  const dispatch = useAppDispatch();

  const [modifyAllFiles, setModifyAllFiles] = useState<IAllFiles>({
    photos: allFiles.photos,
    files: allFiles.files,
  });

  const [content, setContent] = useState(post.content.join('\n'));

  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const [isWarningMessage, setIsWarningMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [isPreviewPhoto, setIsPreviewPhoto] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlerRemoveEdit = () => {
    dispatch(removeEditPost());
  };

  const handlerChangeTitle = (title: string) => {
    setWarningMessage(title);
    setIsWarningMessage(true);
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

  const updatePhoto = (uid: string, photoFetch: any) => {
    const updatePhotos = modifyAllFiles.photos.map((photo) => {
      if (photo.uid === uid) {
        return photoFetch;
      }

      return photo;
    });

    setModifyAllFiles((prev) => ({ ...prev, photos: updatePhotos }));
  };

  return (
    <SContainer>
      <WarningCountPhotos
        onClose={() => setIsWarningMessage(false)}
        open={isWarningMessage}
        message={warningMessage}
      />

      {modifyAllFiles.photos && (
        <PreviewPhoto
          open={isPreviewPhoto}
          onClose={() => setIsPreviewPhoto(false)}
          updatePhoto={updatePhoto}
          // setList={setModifyAllFiles}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          photos={modifyAllFiles.photos}
          description={content.toString().split('\n')}
        />
      )}

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
        <ActionFiles
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
    </SContainer>
  );
};

export default Modification;
