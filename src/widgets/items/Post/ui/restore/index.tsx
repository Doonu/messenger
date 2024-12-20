import React, { FC } from 'react';
import { useAppDispatch } from '@shared/hooks';
import { deletePost } from '@entities/post';
import { photosFilter } from '@shared/util';
import { restorePostById } from '@entities/post/api/restorePostById';

import { SContainer, SButtonContainer, SDelete, SRestore } from './restore.styled';
import { IRestoreProps } from './model/IRestore';

const Restore: FC<IRestoreProps> = ({ postId, setIsDeletedPost, setAllFiles }) => {
  const dispatch = useAppDispatch();

  const handlerRestore = () => {
    dispatch(restorePostById({ postId }))
      .unwrap()
      .then((post) => {
        setIsDeletedPost(false);

        const photos = photosFilter({ photos: post.files, type: 'Photo' });
        const files = photosFilter({ photos: post.files, type: 'file' });

        setAllFiles({ photos, files });
      })
      .catch(() => {});
  };

  const handlerDelete = () => {
    setIsDeletedPost(false);
    dispatch(deletePost(postId));
  };

  return (
    <SContainer>
      <div>Запись удалена</div>
      <SButtonContainer>
        <SRestore onClick={handlerRestore}>Восстановить</SRestore>
        <SDelete onClick={handlerDelete}>Удалить окончательно</SDelete>
      </SButtonContainer>
    </SContainer>
  );
};

export default Restore;
