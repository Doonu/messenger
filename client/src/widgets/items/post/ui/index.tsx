import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@shared/hooks';
import { IAllFiles } from '@shared/models';
import { switchWarningPost } from '@entities/post';
import { photosFilter } from '@shared/util';
import { IPostAndDrag } from '@widgets/items';

import { SContainer, STop } from './post.styled';
import Restore from './restore';
import Content from './content';
import Modification from './modification';
import Actions from './actions';

export const Post: FC<IPostAndDrag> = ({
  post,
  isDraggablePhotoInPost,
  handlerChange,
  deletedPost,
  posts,
  editedPost,
  warningEdit,
  openComments,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<any>(null);

  const [allFiles, setAllFiles] = useState<IAllFiles>({ photos: [], files: [] });

  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);

  const handlerDeletePost = () => {
    if (deletedPost.find((postD) => postD.id === post.id)) {
      setIsDeletedPost(true);
    }
  };

  const filterFiles = () => {
    const photos = photosFilter({ photos: post.files, type: 'Photo' });
    const files = photosFilter({ photos: post.files, type: 'file' });

    setAllFiles({ photos: photos || [], files: files || [] });
  };

  useEffect(() => {
    handlerDeletePost();
  }, [deletedPost]);

  useEffect(() => {
    if (post.id === editedPost?.id) {
      setIsEditPost(true);
    } else {
      setIsEditPost(false);
    }
  }, [editedPost]);

  useEffect(() => {
    filterFiles();
  }, [posts]);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      dispatch(switchWarningPost(false));
    }, 2000);

    if (warningEdit && editedPost?.id === post.id) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      clearTimeout(saveTimeout);
    };
  }, [warningEdit]);

  return (
    <SContainer $isWarning={warningEdit && isEditPost} ref={ref}>
      <STop>
        {isEditPost && (
          <Modification
            setAllFiles={setAllFiles}
            allFiles={allFiles}
            handlerChange={handlerChange}
            isDraggablePhotoInPost={isDraggablePhotoInPost}
            post={post}
          />
        )}

        {!isEditPost && (
          <>
            {isDeletedPost && (
              <Restore
                setAllFiles={setAllFiles}
                setIsDeletedPost={setIsDeletedPost}
                postId={post.id}
              />
            )}
            {!isDeletedPost && <Content post={post} allFiles={allFiles} />}
          </>
        )}
        {!isDeletedPost && (
          <Actions post={post} onActiveComments={openComments} commentLength={post.comments} />
        )}
      </STop>
    </SContainer>
  );
};
