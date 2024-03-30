import { MenuProps } from 'antd';
import React from 'react';
import DeletePost from '../ui/more/deletePost';
import ToggleComments from '../ui/more/toggleComments';
import { IPostState } from 'entities/post/model/IPost';
import EditPost from '../ui/more/editPost';

interface IMoreItemsDropdown {
  post: IPostState;
  services: Array<() => void>;
  disabledServices: boolean;
}

export const moreItemsDropdown = ({
  disabledServices,
  services,
  post,
}: IMoreItemsDropdown): MenuProps['items'] => {
  return [
    {
      label: <DeletePost />,
      onClick: services[0],
      disabled: disabledServices,
      key: '0',
    },
    {
      type: 'divider',
      key: '1',
    },
    {
      label: <ToggleComments post={post} />,
      onClick: services[1],
      disabled: disabledServices,
      key: '2',
    },
    {
      type: 'divider',
      key: '3',
    },
    {
      label: <EditPost />,
      onClick: services[2],
      disabled: disabledServices,
      key: '4',
    },
  ];
};
