import React, { useEffect, useState } from 'react';
import AllContainer from '../../../../components/layouts/all';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorPost,
} from '../../../../entities';
import { SList } from './Feed.styled';
import getAllPost from '../../../../shared/api/post/getAllPost';
import { Post } from '../../../../widgets/post';
import { setAllPosts } from '../../../../entities/post/post.slice';
import AddPost from '../../../../widgets/addPost';
import Empty from '../../../../components/ui/empty';
import SkeletonPost from '../../../../widgets/post/ui/skeleton';
import { selectorPagePost } from '../../../../entities/post/post.selectors';

//TODO: Оптимизировать компонент драгон-input, ререндер на каждый клик

const Feed = () => {
  const dispatch = useAppDispatch();

  const editedPost = useAppSelector(selectorEditedPost);
  const posts = useAppSelector(selectorPost);
  const loadingPosts = useAppSelector(selectorLoadingPosts);
  const errorPosts = useAppSelector(selectorErrorPosts);
  const page = useAppSelector(selectorPagePost);

  const [isDraggablePhoto, setIsDraggablePhoto] = useState(false);
  const [isDraggablePhotoInPost, setIsDraggablePhotoInPost] = useState(false);

  const isEditPost = posts.find((post) => post.id === editedPost?.id);
  const errorMessage = errorPosts ? 'Произошла ошибка' : 'Посты не найдены';

  const handlerPhotoDrag = () => {
    if (!isEditPost) {
      setIsDraggablePhoto((prev) => !prev);
    } else {
      setIsDraggablePhotoInPost((prev) => !prev);
    }
  };

  const handlerChangeInPost = () => {
    setIsDraggablePhotoInPost(false);
  };

  const handlerChange = () => {
    setIsDraggablePhoto(false);
  };

  useEffect(() => {
    dispatch(getAllPost({ page: page }));

    return () => {
      dispatch(setAllPosts([]));
    };
  }, []);

  return (
    <div onDragEnterCapture={handlerPhotoDrag} onDragLeaveCapture={handlerPhotoDrag}>
      <AllContainer>
        <AddPost handlerChange={handlerChange} isDraggablePhoto={isDraggablePhoto} />
        <SList>
          {posts.map((post) => (
            <Post
              handlerChange={handlerChangeInPost}
              isDraggablePhotoInPost={isDraggablePhotoInPost}
              key={post.id}
              post={post}
            />
          ))}
          {loadingPosts && <SkeletonPost />}
        </SList>
        {!posts.length && !loadingPosts && <Empty message={errorMessage} />}
      </AllContainer>
    </div>
  );
};

export default Feed;
