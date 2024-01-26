import { MenuProps } from 'antd';
import React from 'react';
import DeletePost from '../ui/more/deletePost';
import ToggleComments from '../ui/more/toggleComments';
import { IPostState } from '../../../entities/post/model/IPost';
import EditPost from '../ui/more/editPost';

export const moreItemsDropdown = (post: IPostState): MenuProps['items'] => {
  return [
    {
      label: <DeletePost post={post} />,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <ToggleComments post={post} />,
      key: '1',
    },
    {
      type: 'divider',
      key: '2',
    },
    {
      label: <EditPost post={post} />,
      key: '3',
    },
  ];
};
