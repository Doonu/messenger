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
import { DraggableContainer, SContent } from './Profile.styled';
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

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

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

  const handlerPhotoDrag = () => {
    if (!isEditPost) {
      setIsDraggablePhoto((prev) => !prev);
    } else {
      setIsDraggablePhotoInPost((prev) => !prev);
    }
  };

  const idParam = params['id'];

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
    if (idParam) {
      handlerGetUser(+idParam);
      dispatch(getAllPost({ page: 1, userId: +idParam }));
    }

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
          <div style={{ margin: '0 auto', flex: '1' }}>
            {idParam && user.id === +idParam && (
              <AddPost handlerChange={handlerChange} isDraggablePhoto={isDraggablePhoto} />
            )}

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
          </div>

          <div style={{ width: '250px' }}>
            {profileFriends.map((el) => (
              <div key={el.id}>{el.name}</div>
            ))}
          </div>
        </SContent>
      </AllContainer>
    </DraggableContainer>
  );
};

export default Profile;
