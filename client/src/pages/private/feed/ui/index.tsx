import React, { useEffect, useState } from 'react';
import AllContainer from '../../../../components/layouts/all';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorPost,
  selectorPagePost,
  selectorHaseMore,
} from '../../../../entities';
import getAllPost from '../../../../shared/api/post/getAllPost';
import { Post } from '../../../../widgets/post';
import { addPage, setAllPosts } from '../../../../entities/post/post.slice';
import AddPost from '../../../../widgets/addPost';
import SkeletonPost from '../../../../widgets/post/ui/skeleton';
import ObserverList from '../../../../components/custom/lists/ObserverList/ui';
//TODO: Оптимизировать компонент драгон-input, ререндер на каждый клик

const Feed = () => {
  const dispatch = useAppDispatch();

  const editedPost = useAppSelector(selectorEditedPost);
  const posts = useAppSelector(selectorPost);
  const loadingPosts = useAppSelector(selectorLoadingPosts);
  const errorPosts = useAppSelector(selectorErrorPosts);
  const page = useAppSelector(selectorPagePost);
  const haseMore = useAppSelector(selectorHaseMore);

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

  const handlerNextPage = () => {
    dispatch(getAllPost({ page: page + 1 }))
      .unwrap()
      .then(() => {
        dispatch(addPage());
      });
  };

  useEffect(() => {
    dispatch(getAllPost({ page: 1 }));

    return () => {
      dispatch(setAllPosts([]));
    };
  }, []);

  return (
    <div onDragEnterCapture={handlerPhotoDrag} onDragLeaveCapture={handlerPhotoDrag}>
      <AllContainer>
        <AddPost handlerChange={handlerChange} isDraggablePhoto={isDraggablePhoto} />

        <ObserverList
          list={posts}
          itemContent={(el) => (
            <Post
              isDraggablePhotoInPost={isDraggablePhotoInPost}
              handlerChange={handlerChangeInPost}
              post={el}
            />
          )}
          fetchNextPage={handlerNextPage}
          hasMore={haseMore}
          isPending={loadingPosts && page === 1}
          notFoundMessage={errorMessage}
          skeleton={() => <SkeletonPost />}
          isFetching={loadingPosts && page > 1}
        />
      </AllContainer>
    </div>
  );
};

export default Feed;
