import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { PhotoProfile, Sorting, BaseList } from '@shared/components';
import { recalculationOfComments, ICommentsState } from '@entities/post';
import { createComment, deleteComments, getAllCommentsInPost } from '@entities/comment';

import { filterComments, IFilterCommentsKeys } from './lib/filterComments';
import { CommentsProps } from '../../model/IComments';
import CommentItem from '../commentItem';
import { SAutosizeInput, SButton, SContainer, Send, SForm } from './comments.styled';

export const Comments: FC<CommentsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const { name, avatar } = useAppSelector(selectorProfile);

  const [comments, setComments] = useState<ICommentsState[]>([]);

  const [orderBy, setOrderBy] = useState<IFilterCommentsKeys>('1');
  const [orderDirection, setOrderDirection] = useState<0 | 1>(0);

  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;

  const isMore = page * limit === comments.length;

  const [content, setContent] = useState<string>('');

  const getAllComments = () => {
    dispatch(
      getAllCommentsInPost({
        postId: post.id,
        orderBy,
        orderDirection,
        page: 1,
        limit,
      })
    )
      .unwrap()
      .then((data) => {
        setComments(data);
        setPage(1);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  };

  const nextPageGetAllComments = () => {
    setLoader(true);
    dispatch(
      getAllCommentsInPost({
        postId: post.id,
        orderBy,
        orderDirection,
        page: page + 1,
        limit,
      })
    )
      .unwrap()
      .then((data) => {
        setComments((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
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
          setComments((oldComments) => [comment, ...oldComments]);
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
      }
      return {
        ...comment,
        isEdit: false,
      };
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
      }
      return {
        ...comment,
        isEdit: false,
      };
    });

    setComments(newComments);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          onChangeTabs={handlerOrderBy}
        />
      )}
      <BaseList
        list={comments}
        isBorderBottom
        isPending={loader}
        fetchNextPage={nextPageGetAllComments}
        hasMore={isMore}
        itemContent={(comment) => (
          <CommentItem
            userPostId={post.userId}
            handlerEdit={handlerEdit}
            onDelete={() => handlerDeleteComment(comment.id)}
            onEdit={() => handlerUpdateComment(comment.id)}
            comment={comment}
            key={comment.id}
            setComments={setComments}
          />
        )}
      />
      <SForm>
        <PhotoProfile img={avatar} name={name} />
        <SAutosizeInput
          minRows={1}
          maxRows={2}
          isDrag={false}
          value={content}
          onChange={handleChangeContent}
          $position
          placeholder="Написать комментарий..."
          draggable="false"
        />
        <SButton onClick={handlerCreateComment}>
          <Send />
        </SButton>
      </SForm>
    </SContainer>
  );
};
