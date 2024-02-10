import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  SAutosizeInput,
  SButton,
  SContainer,
  SContainerComments,
  SForm,
  SLoaderComment,
} from './comments.styled';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';
import SendIcon from '../../../../shared/assets/icons/sendIcon';
import getAllCommentsInPost from '../../../../shared/api/comments/getAllCommentsInPost';
import CommentItem from '../commentItem';
import PhotoProfile from '../../../../components/custom/profiles/photo';
import createComment from '../../../../shared/api/comments/createComment';
import deleteComments from '../../../../shared/api/comments/deleteComments';
import { CommentsProps } from '../../model/IComments';
import { recalculationOfComments } from '../../../../entities/post/post.slice';
import Sorting from '../../../../components/ui/sorting/ui';
import { filterComments, IFilterCommentsKeys } from './lib/filterComments';
import { ICommentsState } from '../../../../entities/post/model/IPost';

const Comments: FC<CommentsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const { name, avatar } = useAppSelector(selectorProfile);

  const [comments, setComments] = useState<ICommentsState[]>([]);

  const [orderBy, setOrderBy] = useState<IFilterCommentsKeys>('1');
  const [orderDirection, setOrderDirection] = useState<0 | 1>(0);
  const [loader, setLoader] = useState(true);

  const [content, setContent] = useState<string>('');

  const getAllComments = () => {
    dispatch(
      getAllCommentsInPost({ postId: post.id, orderBy: orderBy, orderDirection: orderDirection })
    )
      .unwrap()
      .then((data) => {
        setComments(data);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  };

  const handlerCreateComment = () => {
    if (content) {
      dispatch(createComment({ postId: post.id, content: content.toString().split('\n') }))
        .unwrap()
        .then((comment) => {
          setComments((comments) => [comment, ...comments]);
          dispatch(recalculationOfComments({ action: 1, id: post.id }));
          setContent('');
        });
    }
  };

  const handlerDeleteComment = (id: number) => {
    dispatch(deleteComments(id))
      .unwrap()
      .then(() => {
        const currentComments = comments.filter((com) => com.id !== id);
        dispatch(recalculationOfComments({ action: 0, id: post.id }));
        setComments(currentComments);
      })
      .catch(() => {});
  };

  const handlerUpdateComment = (id: number) => {
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          isEdit: true,
        };
      } else {
        return {
          ...comment,
          isEdit: false,
        };
      }
    });
    setComments(newComments);
  };

  const handlerEdit = (editContent: string | null, id?: number) => {
    const newComments = comments.map((comment) => {
      if (editContent && comment.id === id) {
        return {
          ...comment,
          content: editContent.toString().split('\n'),
          isEdit: false,
        };
      } else {
        return {
          ...comment,
          isEdit: false,
        };
      }
    });

    setComments(newComments);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handlerDirection = () => {
    setOrderDirection((prev) => (prev === 1 ? 0 : 1));
  };

  const handlerOrderBy = (activeKey: IFilterCommentsKeys) => {
    setOrderBy(activeKey);
  };

  useEffect(() => {
    getAllComments();
  }, [orderBy, orderDirection]);

  return (
    <SContainer>
      {!!comments.length && (
        <Sorting<IFilterCommentsKeys>
          tabs={filterComments}
          orderBy={orderBy}
          orderDirection={orderDirection}
          onChangeDirection={handlerDirection}
          onChangeTabs={() => handlerOrderBy}
        />
      )}

      {loader && <SLoaderComment />}

      {!!comments.length && (
        <SContainerComments>
          {comments.map((comment) => (
            <CommentItem
              userPostId={post.userId}
              handlerEdit={handlerEdit}
              onDelete={() => handlerDeleteComment(comment.id)}
              onEdit={() => handlerUpdateComment(comment.id)}
              comment={comment}
              key={comment.id}
              setComments={setComments}
            />
          ))}
        </SContainerComments>
      )}

      <SForm>
        <PhotoProfile img={avatar}>{name[0]}</PhotoProfile>
        <SAutosizeInput
          minRows={1}
          maxRows={5}
          isDrag={false}
          value={content}
          onChange={handleChangeContent}
          $position={true}
          placeholder="Написать комментарий..."
          draggable="false"
        />
        <SButton onClick={handlerCreateComment}>
          <SendIcon />
        </SButton>
      </SForm>
    </SContainer>
  );
};

export default Comments;
