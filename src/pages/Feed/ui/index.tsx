import React, { useEffect } from 'react';
import { AllContainer, ObserverList, CollapsePost } from '@shared/components';
import { useAppSelector, useAppDispatch } from '@shared/hooks';
import {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorPost,
  selectorPagePost,
  selectorPostHaseMore,
  selectorWarningEdit,
  selectorDeletedPost,
  addPage,
  setAllPosts,
} from '@entities/post';
import { getAllPost } from '@shared/api';
import { AddPost } from '@widgets/forms';
import { SkeletonPost } from '@widgets/items';

import { SContainerList } from './feed.styled';

const Feed = () => {
  const dispatch = useAppDispatch();

  const loadingPosts = useAppSelector(selectorLoadingPosts);
  const errorPosts = useAppSelector(selectorErrorPosts);
  const page = useAppSelector(selectorPagePost);
  const haseMore = useAppSelector(selectorPostHaseMore);
  const posts = useAppSelector(selectorPost);
  const warningEdit = useAppSelector(selectorWarningEdit);
  const deletedPost = useAppSelector(selectorDeletedPost);
  const editedPost = useAppSelector(selectorEditedPost);

  const errorMessage = errorPosts ? 'Произошла ошибка' : 'Посты не найдены';

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
    <AllContainer>
      <AddPost />

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
  );
};

export default Feed;
