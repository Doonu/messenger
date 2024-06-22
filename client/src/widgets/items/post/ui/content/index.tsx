import React, { FC } from 'react';
import { SHead, SP } from './content.styled';
import MainPostProfile from 'shared/components/custom/profiles/mainPost';
import { postTime } from 'shared/util/time';
import More from '../more';
import { useAppSelector } from 'hooks/redux';
import { selectorEditedPost } from 'entities/post/post.selectors';
import Grid from './ui/grid';
import { Carousel } from 'shared/components/ui/carousel';
import Files from 'features/files';
import { IContent } from './model/IPhoto';

const Content: FC<IContent> = ({ post, allFiles }) => {
  const editedPost = useAppSelector(selectorEditedPost);

  const visibleMore = editedPost?.id !== post.id;

  return (
    <>
      <SHead>
        <MainPostProfile
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
