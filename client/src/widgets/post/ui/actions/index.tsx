import React, { FC, useState } from 'react';
import { SComment, SInfo, SShared } from './acions.styled';
import LikeButton from '../../../../components/ui/buttons/likesButton/likeButton';
import likePost from '../../../../shared/api/post/likePost';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorUser } from '../../../../entities/user/user.selectors';
import { IPostState } from '../../../../entities/post/model/IPost';

interface IActions {
  post: IPostState;
  commentLength: number;
  onActiveComments: () => void;
}

const Actions: FC<IActions> = ({ onActiveComments, commentLength, post }) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector(selectorUser);

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
