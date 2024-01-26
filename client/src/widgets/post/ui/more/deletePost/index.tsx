import React, { FC } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux';
import deletePostById from '../../../../../shared/api/post/deletePostById';
import { IPost } from '../../../model/shared';

const DeletePost: FC<IPost> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handlerDeletePost = () => {
    dispatch(deletePostById(post.id));
  };

  return <div onClick={handlerDeletePost}>Удалить запись</div>;
};

export default DeletePost;
