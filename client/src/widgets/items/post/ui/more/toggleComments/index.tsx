import React, { FC } from 'react';
import { IPost } from 'widgets/items/post/model/shared';

const ToggleComments: FC<IPost> = ({ post }) => {
  return <>{post.isDisabledComments ? 'Включить комментарии' : 'Выключить комментарии'}</>;
};

export default ToggleComments;
