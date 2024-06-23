import React, { FC } from 'react';
import { moreItemsDropdown } from '../../lib/moreOptions';
import { SLink, SMore } from './more.styled';
import { IPost } from '../../model/shared';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { editPost } from 'entities/post/post.slice';
import { toggleCommentsById, deletePostById } from 'shared/api';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { Dropdown } from 'antd';

const More: FC<IPost> = ({ post }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorProfile);

  const disabledServices = user.id !== post.userId;

  const handlerEditPost = () => {
    disabledServices || dispatch(editPost(post.id));
  };

  const handlerToggleComments = () => {
    disabledServices ||
      dispatch(
        toggleCommentsById({ isDisabledComments: post.isDisabledComments, postId: post.id })
      );
  };

  const handlerDeletePost = () => {
    disabledServices || dispatch(deletePostById(post.id));
  };

  return (
    <Dropdown
      placement="bottom"
      trigger={['click']}
      menu={{
        items: moreItemsDropdown({
          post: post,
          services: [handlerDeletePost, handlerToggleComments, handlerEditPost],
          disabledServices: disabledServices,
        }),
      }}
    >
      <SLink>
        <SMore size={20} />
      </SLink>
    </Dropdown>
  );
};

export default More;
