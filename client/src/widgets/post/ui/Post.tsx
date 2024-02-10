import React, { FC, useEffect, useRef, useState } from 'react';
import { SContainer, STop } from './post.styled';
import Restore from './restore';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  selectorDeletedPost,
  selectorEditedPost,
  selectorPost,
  selectorWarningEdit,
} from '../../../entities';
import { IAllFiles } from '../../../shared/models/IPost';
import Comments from './comments';
import { removeWarningPost } from '../../../entities/post/post.slice';
import { IPostAndDrag } from '../model/shared';
import Content from './content';
import Modification from './modification';
import Actions from './actions';
import { photosFilter } from '../../../shared/util/filter';

const Post: FC<IPostAndDrag> = ({ post, isDraggablePhotoInPost, handlerChange }) => {
  const dispatch = useAppDispatch();

  const editedPost = useAppSelector(selectorEditedPost);
  const warningEdit = useAppSelector(selectorWarningEdit);
  const posts = useAppSelector(selectorPost);
  const deletedPost = useAppSelector(selectorDeletedPost);

  const ref = useRef<any>(null);

  const [allFiles, setAllFiles] = useState<IAllFiles>({ photos: [], files: [] });

  const [isDeletedPost, setIsDeletedPost] = useState(false);
  const [isCommentsActive, setIsCommentsActive] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);

  const handleActiveComments = () => {
    setIsCommentsActive((prev) => !prev);
  };

  const handlerDeletePost = () => {
    if (deletedPost.find((postD) => postD.id === post.id)) {
      setIsDeletedPost(true);
    }
  };

  const filterFiles = () => {
    const photos = photosFilter({ photos: post.files, type: 'photo' });
    const files = photosFilter({ photos: post.files, type: 'file' });

    setAllFiles({ photos: photos || [], files: files || [] });
  };

  useEffect(() => {
    handlerDeletePost();
  }, [deletedPost]);

  useEffect(() => {
    if (post.isDisabledComments) setIsCommentsActive(false);
  }, [post.isDisabledComments]);

  useEffect(() => {
    post.id === editedPost?.id ? setIsEditPost(true) : setIsEditPost(false);
  }, [editedPost]);

  useEffect(() => {
    filterFiles();
  }, [posts]);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      dispatch(removeWarningPost());
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
          <Actions
            post={post}
            onActiveComments={handleActiveComments}
            commentLength={post.comments}
          />
        )}
      </STop>
      {isCommentsActive && !isDeletedPost && <Comments post={post} />}
    </SContainer>
  );
};

export default Post;
