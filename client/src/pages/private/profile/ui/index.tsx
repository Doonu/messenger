import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IUser } from 'shared/models/IUser';
import AllContainer from 'shared/components/layouts/all';
import { getAllPost, getUser } from 'shared/api';
import getAllFriends from 'shared/api/http/user/getAllFriends';
import ActionsProfile from './actionsProfile';
import ObserverList from 'shared/components/custom/lists/ObserverList/ui';
import { DraggableContainer, SContent, SSidebars, ViewContainer } from './Profile.styled';
import { selectorProfile } from 'entities/profile/profile.selectors';
import {
  selectorDeletedPost,
  selectorEditedPost,
  selectorErrorPosts,
  selectorHaseMore,
  selectorLoadingPosts,
  selectorPagePost,
  selectorPost,
  selectorWarningEdit,
} from 'entities/post/post.selectors';
import { addPage, setAllPosts } from 'entities/post/post.slice';
import AddPost from 'widgets/forms/addPost';
import Friends from 'features/friends';
import SkeletonPost from 'widgets/items/post/ui/skeleton';
import CollapsePost from 'pages/private/feed/ui/collapsePost';

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const idParam = params['id'];

  const user = useAppSelector(selectorProfile);
  const editedPost = useAppSelector(selectorEditedPost);
  const loadingPosts = useAppSelector(selectorLoadingPosts);
  const errorPosts = useAppSelector(selectorErrorPosts);
  const page = useAppSelector(selectorPagePost);
  const haseMore = useAppSelector(selectorHaseMore);
  const posts = useAppSelector(selectorPost);
  const warningEdit = useAppSelector(selectorWarningEdit);
  const deletedPost = useAppSelector(selectorDeletedPost);

  const [isDraggablePhoto, setIsDraggablePhoto] = useState(false);
  const [isDraggablePhotoInPost, setIsDraggablePhotoInPost] = useState(false);

  const [profilePage, setProfilePage] = useState<IUser>({} as IUser);
  const [profileFriends, setProfileFriends] = useState<IUser[]>([]);

  const errorMessage = errorPosts ? 'Произошла ошибка' : 'Посты не найдены';
  const isEditPost = posts.find((post) => post.id === editedPost?.id);

  const generalFriends = profileFriends.filter((profileFriend) =>
    user.friends.includes(profileFriend.id)
  );

  const isMe = idParam && user.id === +idParam;

  const handlerPhotoDrag = () => {
    if (!isEditPost) {
      setIsDraggablePhoto((prev) => !prev);
    } else {
      setIsDraggablePhotoInPost((prev) => !prev);
    }
  };

  const handlerChange = () => {
    setIsDraggablePhoto(false);
  };

  const handlerChangeInPost = () => {
    setIsDraggablePhotoInPost(false);
  };

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
    <DraggableContainer onDragEnterCapture={handlerPhotoDrag} onDragLeaveCapture={handlerPhotoDrag}>
      <AllContainer right={false}>
        <ActionsProfile
          setProfileFriends={setProfileFriends}
          profileFriends={profileFriends}
          profilePage={profilePage}
        />

        <SContent>
          <ViewContainer>
            {isMe && (
              <AddPost
                handlerSetDraggablePhoto={handlerChange}
                isDraggablePhoto={isDraggablePhoto}
              />
            )}
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
          </ViewContainer>

          <SSidebars>
            {!!generalFriends.length && !isMe && (
              <Friends friends={generalFriends} title={'Общие друзья'} />
            )}
            {!!profileFriends.length && (
              <Friends isOnlineFriends friends={profileFriends} title={'Друзья'} />
            )}
          </SSidebars>
        </SContent>
      </AllContainer>
    </DraggableContainer>
  );
};

export default Profile;
