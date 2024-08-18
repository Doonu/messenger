import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '@shared/models';
import { AllContainer, ObserverList, CollapsePost } from '@shared/components';
import { getAllPost, getUser, getAllFriends } from '@shared/api';
import { selectorProfile } from '@entities/profile';
import {
  selectorDeletedPost,
  selectorEditedPost,
  selectorErrorPosts,
  selectorPostHaseMore,
  selectorLoadingPosts,
  selectorPagePost,
  selectorPost,
  selectorWarningEdit,
  addPage,
  setAllPosts,
} from '@entities/post';
import { AddPost } from '@widgets/forms';
import { Friends } from '@features/Friends';
import { SkeletonPost } from '@widgets/items';
import { useAppSelector, useAppDispatch } from '@shared/hooks';

import { SContent, SSidebars, ViewContainer } from './Profile.styled';
import ActionsProfile from './actionsProfile';

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const idParam = params.id;

  const user = useAppSelector(selectorProfile);
  const editedPost = useAppSelector(selectorEditedPost);
  const loadingPosts = useAppSelector(selectorLoadingPosts);
  const errorPosts = useAppSelector(selectorErrorPosts);
  const page = useAppSelector(selectorPagePost);
  const haseMore = useAppSelector(selectorPostHaseMore);
  const posts = useAppSelector(selectorPost);
  const warningEdit = useAppSelector(selectorWarningEdit);
  const deletedPost = useAppSelector(selectorDeletedPost);

  const [profilePage, setProfilePage] = useState<IUser | null>(null);
  const [profileFriends, setProfileFriends] = useState<IUser[]>([]);

  const errorMessage = errorPosts ? 'Произошла ошибка' : 'Посты не найдены';

  const generalFriends = profileFriends.filter((profileFriend) =>
    user.friends.includes(profileFriend.id)
  );

  const isMe = idParam && user.id === +idParam;

  const handlerGetUser = (id: number) => {
    dispatch(getUser(id))
      .unwrap()
      .then((data) => {
        setProfilePage(data);
        dispatch(getAllFriends(id))
          .unwrap()
          .then((fetchedUser) => {
            setProfileFriends(fetchedUser);
          })
          .catch(() => {});
      })
      .catch(() => {
        navigate('/');
      });
  };

  const handlerNextPage = async () => {
    if (idParam)
      dispatch(getAllPost({ page: page + 1, userId: +idParam }))
        .unwrap()
        .then(() => {
          dispatch(addPage());
        });
  };

  useEffect(() => {
    if (idParam) {
      handlerGetUser(+idParam);
      dispatch(getAllPost({ page: 1, userId: +idParam }));
    }

    window.scrollTo(0, 0);

    return () => {
      dispatch(setAllPosts([]));
    };
  }, [idParam]);

  return (
    <AllContainer right={false}>
      {profilePage && (
        <ActionsProfile
          setProfileFriends={setProfileFriends}
          profileFriends={profileFriends}
          profilePage={profilePage}
        />
      )}

      <SContent>
        <ViewContainer>
          {isMe && <AddPost />}
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
        </ViewContainer>

        <SSidebars>
          {!!generalFriends.length && !isMe && (
            <Friends friends={generalFriends} title="Общие друзья" />
          )}
          {!!profileFriends.length && (
            <Friends isOnlineFriends friends={profileFriends} title="Друзья" />
          )}
        </SSidebars>
      </SContent>
    </AllContainer>
  );
};

export default Profile;
