import React, { FC } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux';
import { editPost } from '../../../../../entities/post/post.slice';
import { IPost } from '../../../model/shared';

const EditPost: FC<IPost> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handlerEditPost = () => {
    dispatch(editPost(post.id));
  };

  return <div onClick={handlerEditPost}>Редактировать пост</div>;
};

export default EditPost;
