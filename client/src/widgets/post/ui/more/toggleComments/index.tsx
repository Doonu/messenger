import React, { FC } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux';
import toggleCommentsById from '../../../../../shared/api/post/toggleCommentsById';
import { IPost } from '../../../model/shared';

const ToggleComments: FC<IPost> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handlerToggleComments = () => {
    dispatch(toggleCommentsById({ isDisabledComments: post.isDisabledComments, postId: post.id }));
  };

  return (
    <div onClick={handlerToggleComments}>
      {post.isDisabledComments ? 'Включить комментарии' : 'Выключить комментарии'}
    </div>
  );
};

export default ToggleComments;
