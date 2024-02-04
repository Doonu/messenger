import React, { useEffect, useState } from 'react';
import AllContainer from '../../../../components/layouts/all';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorPost } from '../../../../entities/post/post.selectors';
import { SList } from './Feed.styled';
import getAllPost from '../../../../shared/api/post/getAllPost';
import { Post } from '../../../../widgets/post';
import { setAllPosts } from '../../../../entities/post/post.slice';
import AddPost from '../../../../widgets/addPost';

//TODO: Оптимизировать компонент драгон-input, ререндер на каждый клик
//TODO: Пагинация(Virtualize-list)

const Home = () => {
  const dispatch = useAppDispatch();

  const { posts, editedPost } = useAppSelector(selectorPost);

  const [isDraggablePhoto, setIsDraggablePhoto] = useState(false);
  const [isDraggablePhotoInPost, setIsDraggablePhotoInPost] = useState(false);

  const isEditPost = posts.find((post) => post.id === editedPost?.id);

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
    dispatch(getAllPost());

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
        </SList>
      </AllContainer>
    </div>
  );
};

export default Home;
