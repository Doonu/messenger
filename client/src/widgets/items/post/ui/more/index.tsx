import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { editPost } from '@entities/post';
import { toggleCommentsById, deletePostById } from '@shared/api';
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
    if (disabledServices) {
      dispatch(editPost(post.id));
    }
  };

  const handlerToggleComments = () => {
    if (disabledServices) {
      dispatch(
        toggleCommentsById({ isDisabledComments: post.isDisabledComments, postId: post.id })
      );
    }
  };

  const handlerDeletePost = () => {
    if (disabledServices) {
      dispatch(deletePostById(post.id));
    }
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
