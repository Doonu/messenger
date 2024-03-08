import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IUser } from '../../../../shared/models/IUser';
import AllContainer from '../../../../components/layouts/all';
import { getAllPost, getUser } from '../../../../shared/api';
import getFriends from '../../../../shared/api/http/user/getFriends';
import ActionsProfile from './actionsProfile';
import ObserverList from '../../../../components/custom/lists/ObserverList/ui';
import { Post } from '../../../../widgets/post';
import SkeletonPost from '../../../../widgets/post/ui/skeleton';
import { DraggableContainer, SContent, SSidebars, ViewContainer } from './Profile.styled';
import {
  selectorDeletedPost,
  selectorEditedPost,
  selectorErrorPosts,
  selectorHaseMore,
  selectorLoadingPosts,
  selectorPagePost,
  selectorPost,
  selectorProfile,
  selectorWarningEdit,
} from '../../../../entities';
import { addPage, setAllPosts } from '../../../../entities/post/post.slice';
import AddPost from '../../../../widgets/addPost';
import Friends from '../../../../features/friends';

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
  const errorMessage = errorPosts ? 'Произошла ошибка' : 'Посты не найдены';
  const isEditPost = posts.find((post) => post.id === editedPost?.id);
  const [isDraggablePhotoInPost, setIsDraggablePhotoInPost] = useState(false);

  const [profilePage, setProfilePage] = useState<IUser>({} as IUser);
  const [profileFriends, setProfileFriends] = useState<IUser[]>([]);

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
        dispatch(getFriends(id))
          .unwrap()
          .then((data) => {
            setProfileFriends(data);
          })
          .catch(() => {});
      })
      .catch(() => {
        navigate('/');
      });
  };

  const handlerNextPage = () => {
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
            {isMe && <AddPost handlerChange={handlerChange} isDraggablePhoto={isDraggablePhoto} />}

            <ObserverList
              list={posts}
              itemContent={(el) => (
                <Post
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
              skeleton={() => <SkeletonPost />}
              isFetching={loadingPosts && page > 1}
            />
          </ViewContainer>

          <SSidebars>
            {!!generalFriends.length && !isMe && (
              <Friends
                count={generalFriends.length}
                friends={generalFriends}
                title={'Общие друзья'}
              />
            )}
            <Friends count={profileFriends.length} friends={profileFriends} title={'Друзья'} />
          </SSidebars>
        </SContent>
      </AllContainer>
    </DraggableContainer>
  );
};

export default Profile;
