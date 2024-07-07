import React, { FC } from 'react';
import { Carousel, MainPost } from '@shared/components';
import { postTime } from '@shared/util';
import { useAppSelector } from '@shared/hooks';
import { selectorEditedPost } from '@entities/post';
import { Files } from '@features/Files';

import Grid from './ui/grid';
import More from '../more';
import { SHead, SP } from './content.styled';
import { IContent } from './model/IPhoto';

const Content: FC<IContent> = ({ post, allFiles }) => {
  const editedPost = useAppSelector(selectorEditedPost);

  const visibleMore = editedPost?.id !== post.id;

  return (
    <>
      <SHead>
        <MainPost
          status={post.author.statusConnected}
          statusTime={post.author.timeConnected}
          time={postTime(post.createdAt)}
          name={post.author.name}
          avatar={post.author.imgSubstitute}
          id={post.author.id}
        />
        {visibleMore && <More post={post} />}
      </SHead>

      {post.content.map((content, i) => (
        <SP key={post.id + i}>{content}</SP>
      ))}

      {post.view === 'slider' && (
        <Carousel fixedMinHeight={500} speed={0} photoList={allFiles.photos} />
      )}

      {post.view === 'grid' && <Grid photos={allFiles.photos} />}

      <Files data={allFiles} isModify={false} />
    </>
  );
};

export default Content;
