import React, { FC, useState } from 'react';
import { IPostAndDrag, Post, Comments } from '@widgets/Post';
import { Collapse } from '@shared/ui';

// TODO: Положить рядом со списком
export const CollapsePost: FC<Omit<IPostAndDrag, 'openComments'>> = ({
  post,
  editedPost,
  warningEdit,
  posts,
  deletedPost,
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
          post={post}
        />
      }
      body={<Comments post={post} />}
    />
  );
};
