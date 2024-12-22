import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { likePost } from '@entities/post';
import { LikeButton } from '@shared/ui';

import { SComment, SInfo, SShared } from './acions.styled';
import { IActions } from './model/IActions';

const Actions: FC<IActions> = ({ onActiveComments, commentLength, post }) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector(selectorProfile);

  const [isLike, setIsLike] = useState<boolean>(post.likesList.includes(+id));

  const handleLikeClick = () => {
    dispatch(likePost(post.id));
    setIsLike((prev) => !prev);
  };

  return (
    <SInfo>
      <LikeButton $isLike={isLike} onClick={handleLikeClick}>
        {post.countLikes}
      </LikeButton>
      {!post.isDisabledComments && <SComment onClick={onActiveComments}>{commentLength}</SComment>}
      <SShared>{post.shared}</SShared>
    </SInfo>
  );
};

export default Actions;
