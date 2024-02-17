import React, { FC } from 'react';
import { SHead, SP } from './content.styled';
import MainPostProfile from '../../../../components/custom/profiles/mainPost';
import { postTime } from '../../../../shared/util/time';
import More from '../more';
import { useAppSelector } from '../../../../hooks/redux';
import { IPostState } from '../../../../entities/post/model/IPost';
import { selectorEditedPost } from '../../../../entities';
import { IAllFiles } from '../../../../shared/models/IPost';
import Grid from './ui/grid';
import { Carousel } from '../../../../components/ui/carousel';
import Files from '../../../../features/files';

interface IContent {
  post: IPostState;
  allFiles: IAllFiles;
}

const Content: FC<IContent> = ({ post, allFiles }) => {
  const editedPost = useAppSelector(selectorEditedPost);

  const visibleMore = editedPost?.id !== post.id;

  return (
    <>
      <SHead>
        <MainPostProfile
          time={postTime(post.createdAt)}
          name={post.author.name}
          avatar={post.author.imgSubstitute}
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
