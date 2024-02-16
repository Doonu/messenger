import React, { Dispatch, FC, SetStateAction } from 'react';
import { SButtonContainer, SDelete, SRestore } from './restore.styled';
import { SContainer } from './restore.styled';
import { useAppDispatch } from '../../../../hooks/redux';
import restorePostById from '../../../../shared/api/post/restorePostById';
import { deletePost } from '../../../../entities/post/post.slice';
import { IAllFiles } from '../../../../shared/models/IPost';
import { photosFilter } from '../../../../shared/util/filter';

interface IRestoreProps {
  postId: number;
  setIsDeletedPost: Dispatch<SetStateAction<boolean>>;
  setAllFiles: Dispatch<SetStateAction<IAllFiles>>;
}

const Restore: FC<IRestoreProps> = ({ postId, setIsDeletedPost, setAllFiles }) => {
  const dispatch = useAppDispatch();

  const handlerRestore = () => {
    dispatch(restorePostById(postId))
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
