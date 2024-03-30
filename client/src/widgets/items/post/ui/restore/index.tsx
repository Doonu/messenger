import React, { FC } from 'react';
import { SButtonContainer, SDelete, SRestore } from './restore.styled';
import { SContainer } from './restore.styled';
import { useAppDispatch } from 'hooks/redux';
import { restorePostById } from 'shared/api';
import { deletePost } from 'entities/post/post.slice';
import { photosFilter } from 'shared/util/filter';
import { IRestoreProps } from './model/IRestore';

const Restore: FC<IRestoreProps> = ({ postId, setIsDeletedPost, setAllFiles }) => {
  const dispatch = useAppDispatch();

  const handlerRestore = () => {
    dispatch(restorePostById({ postId: postId }))
      .unwrap()
      .then((post) => {
        setIsDeletedPost(false);

        const photos = photosFilter({ photos: post.files, type: 'photo' });
        const files = photosFilter({ photos: post.files, type: 'file' });

        setAllFiles({ photos: photos, files: files });
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
