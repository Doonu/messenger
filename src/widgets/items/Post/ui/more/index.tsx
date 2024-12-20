import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { deletePostById, editPost, toggleCommentsById } from '@entities/post';
import { selectorProfile } from '@entities/profile';
import { Dropdown } from 'antd';
import { IPost } from '@widgets/items';

import { SLink, SMore } from './more.styled';
import { moreItemsDropdown } from '../../lib/moreOptions';

const More: FC<IPost> = ({ post }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorProfile);

  const disabledServices = user.id !== post.userId;

  const handlerEditPost = () => {
    dispatch(editPost(post.id));
  };

  const handlerToggleComments = () => {
    dispatch(toggleCommentsById({ isDisabledComments: post.isDisabledComments, postId: post.id }));
  };

  const handlerDeletePost = () => {
    dispatch(deletePostById(post.id));
  };

  return (
    <Dropdown
      placement="bottom"
      trigger={['click']}
      menu={{
        items: moreItemsDropdown({
          post,
          services: [handlerDeletePost, handlerToggleComments, handlerEditPost],
          disabledServices,
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
