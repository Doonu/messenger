import React, { FC, useState } from 'react';
import { IPostAndDrag } from 'widgets/items/post/model/shared';
import Collapse from '../../ui/collapse';
import { Post } from 'widgets/items/post';
import Comments from 'widgets/items/post/ui/comments';

const CollapsePost: FC<Omit<IPostAndDrag, 'openComments'>> = ({
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

export default CollapsePost;
