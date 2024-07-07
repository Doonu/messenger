import React, { FC, useState } from 'react';
import { IPostAndDrag, Post, Comments } from '@widgets/items';
import { Collapse } from '@shared/components';

// TODO: Положить рядом со списком
export const CollapsePost: FC<Omit<IPostAndDrag, 'openComments'>> = ({
  post,
  isDraggablePhotoInPost,
  editedPost,
  warningEdit,
  posts,
  deletedPost,
  handlerChange,
}) => {
  const [isCommentsActive, setIsCommentsActive] = useState(false);
  const handlerSwitch = () => setIsCommentsActive((prev) => !prev);

  return (
    <Collapse
      isOpen={isCommentsActive}
      header={
        <Post
          openComments={handlerSwitch}
          editedPost={editedPost}
          warningEdit={warningEdit}
          posts={posts}
          deletedPost={deletedPost}
          isDraggablePhotoInPost={isDraggablePhotoInPost}
          handlerChange={handlerChange}
          post={post}
        />
      }
      body={<Comments post={post} />}
    />
  );
};
