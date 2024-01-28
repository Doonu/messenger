import React, { FC } from 'react';
import { SHead, SP } from './content.styled';
import MainPostProfile from '../../../../components/ui/profiles/mainPost';
import { postTime } from '../../../../shared/util/time';
import More from '../more';
import { useAppSelector } from '../../../../hooks/redux';
import { IPostState } from '../../../../entities/post/model/IPost';
import { selectorPost } from '../../../../entities/post/post.selectors';
import { IAllFiles } from '../../../../shared/models/IPost';

interface IContent {
  post: IPostState;
  allFiles: IAllFiles;
}

const Content: FC<IContent> = ({ post, allFiles }) => {
  const { editedPost } = useAppSelector(selectorPost);

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
      {post.view === 'slider' &&
        allFiles.photos?.map(({ url, id }) => (
          <img key={id} style={{ width: '100%', height: '100%' }} src={url}></img>
        ))}
      {post.view === 'grid' &&
        allFiles.photos?.map(({ url, id }) => (
          <img key={id} style={{ width: '100%', height: '100%' }} src={url}></img>
        ))}
      {allFiles.files?.map(({ url, id }) => (
        <a key={id} href={`http://localhost:5000/${url}`} target="blank">
          Сслы
        </a>
      ))}
      {post.view && post.view}
    </>
  );
};

export default Content;
