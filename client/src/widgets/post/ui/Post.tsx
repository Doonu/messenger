import React, { FC, useEffect, useRef, useState } from 'react';
import { SContainer, STop } from './post.styled';
import Restore from './restore';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectorPost } from '../../../entities/post/post.selectors';
import { ICommentsState } from '../../../entities/post/model/IPost';
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

  const { deletedPost, editedPost, warningEdit, posts } = useAppSelector(selectorPost);

  const ref = useRef<any>(null);

  const [allFiles, setAllFiles] = useState<IAllFiles>({ photos: [], files: [] });
  const [comments, setComments] = useState<ICommentsState[]>([]);

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

  const handlerPost = () => {
    warningEdit && isEditPost && dispatch(removeWarningPost());
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
    if (warningEdit && editedPost?.id === post.id) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [warningEdit]);

  return (
    <SContainer ref={ref} onClick={handlerPost}>
      <STop>
        {warningEdit && isEditPost && <>Предупреждение</>}

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
      {isCommentsActive && !isDeletedPost && (
        <Comments comments={comments} setComments={setComments} post={post} />
      )}
    </SContainer>
  );
};

export default Post;
