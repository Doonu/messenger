import React, { Dispatch, FC, SetStateAction } from 'react';
import { SButtonContainer, SDelete, SRestore } from './restore.styled';
import { SContainer } from './restore.styled';
import { useAppDispatch } from '../../../../hooks/redux';
import restorePostById from '../../../../shared/api/post/restorePostById';
import { deletePost } from '../../../../entities/post/post.slice';
import { IAllFiles, IFilesPost } from '../../../../shared/models/IPost';

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

        //TODO: Вынести в отдельные функции
        const photos: IFilesPost[] = post.files.filter(({ url }) => {
          const arrayFile = url.split('.');
          if (
            arrayFile[arrayFile.length - 1].includes('jpg') ||
            arrayFile[arrayFile.length - 1].includes('png') ||
            arrayFile[arrayFile.length - 1].includes('webp')
          ) {
            return true;
          }
          return false;
        });

        const files: IFilesPost[] = post.files.filter(({ url }) => {
          const arrayFile = url.split('.');
          if (
            arrayFile[arrayFile.length - 1].includes('pdf') ||
            arrayFile[arrayFile.length - 1].includes('docx')
          ) {
            return true;
          }
          return false;
        });

        setAllFiles({ photos: photos, files: files });
      })
      .catch(() => {});
  };

  const handlerDelete = () => dispatch(deletePost(postId));

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
