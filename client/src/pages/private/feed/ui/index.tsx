import React, { useEffect, useState } from 'react';
import AllContainer from 'shared/components/layouts/all';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorPost,
  selectorPagePost,
  selectorHaseMore,
  selectorWarningEdit,
  selectorDeletedPost,
} from 'entities/post/post.selectors';
import { getAllPost } from 'shared/api';
import { addPage, setAllPosts } from 'entities/post/post.slice';
import AddPost from 'widgets/forms/addPost';
import SkeletonPost from 'widgets/items/post/ui/skeleton';
import ObserverList from 'shared/components/custom/lists/ObserverList/ui';
import { DraggableContainer, SContainerList } from './Feed.styled';
import CollapsePost from 'pages/private/feed/ui/collapsePost';

const Feed = () => {
  const dispatch = useAppDispatch();

  const loadingPosts = useAppSelector(selectorLoadingPosts);
  const errorPosts = useAppSelector(selectorErrorPosts);
  const page = useAppSelector(selectorPagePost);
  const haseMore = useAppSelector(selectorHaseMore);
  const posts = useAppSelector(selectorPost);
  const warningEdit = useAppSelector(selectorWarningEdit);
  const deletedPost = useAppSelector(selectorDeletedPost);
  const editedPost = useAppSelector(selectorEditedPost);

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

  const handlerNextPage = async () => {
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
    <DraggableContainer onDragEnterCapture={handlerPhotoDrag} onDragLeaveCapture={handlerPhotoDrag}>
      <AllContainer>
        <AddPost handlerSetDraggablePhoto={handlerChange} isDraggablePhoto={isDraggablePhoto} />

        <SContainerList $isLength={!posts.length && !loadingPosts}>
          <ObserverList
            list={posts}
            itemContent={(el) => (
              <CollapsePost
                key={el.id}
                editedPost={editedPost}
                warningEdit={warningEdit}
                posts={posts}
                deletedPost={deletedPost}
                isDraggablePhotoInPost={isDraggablePhotoInPost}
                handlerChange={handlerChangeInPost}
                post={el}
              />
            )}
            fetchNextPage={handlerNextPage}
            hasMore={haseMore}
            isPending={loadingPosts && page === 1}
            notFoundMessage={errorMessage}
            skeleton={(el) => <SkeletonPost key={el} />}
            isFetching={loadingPosts && page > 1}
          />
        </SContainerList>
      </AllContainer>
    </DraggableContainer>
  );
};

export default Feed;
