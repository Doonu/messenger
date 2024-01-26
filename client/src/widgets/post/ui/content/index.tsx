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
      {allFiles.photos?.map(({ url, id }) => (
        <img key={id} style={{ width: '300px', height: '300px' }} src={url}></img>
      ))}
      {post.content.map((content, i) => (
        <SP key={post.id + i}>{content}</SP>
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
