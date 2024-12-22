import React, { FC } from 'react';
import { IPost } from '@widgets/Post';

const ToggleComments: FC<IPost> = ({ post }) => {
  return <>{post.isDisabledComments ? 'Включить комментарии' : 'Выключить комментарии'}</>;
};

export default ToggleComments;
