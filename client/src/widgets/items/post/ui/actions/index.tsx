import React, { FC, useState } from 'react';
import { SComment, SInfo, SShared } from './acions.styled';
import LikeButton from 'shared/components/ui/buttons/likesButton/likeButton';
import { likePost } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { IActions } from './model/IActions';

const Actions: FC<IActions> = ({ onActiveComments, commentLength, post }) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector(selectorProfile);

  const [isLike, setIsLike] = useState(post.likesList.includes(+id));

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
