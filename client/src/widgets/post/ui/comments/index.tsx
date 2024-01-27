import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { SAutosizeInput, SButton, SContainer, SContainerComments, SForm } from './comments.styled';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { selectorUser } from '../../../../entities/user/user.selectors';
import SendIcon from '../../../../shared/assets/icons/sendIcon';
import getAllCommentsInPost from '../../../../shared/api/comments/getAllCommentsInPost';
import CommentItem from '../commentItem';
import PhotoProfile from '../../../../components/ui/profiles/photo';
import createComment from '../../../../shared/api/comments/createComment';
import deleteComments from '../../../../shared/api/comments/deleteComments';
import { CommentsProps } from '../../model/IComments';
import { recalculationOfComments } from '../../../../entities/post/post.slice';

const Comments: FC<CommentsProps> = ({ post, setComments, comments }) => {
  const dispatch = useAppDispatch();

  const { name, avatar } = useAppSelector(selectorUser);

  const [content, setContent] = useState('');

  const getAllComments = () => {
    dispatch(getAllCommentsInPost(post.id))
      .unwrap()
      .then((data) => {
        setComments(data);
      })
      .catch(() => {});
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

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <SContainer>
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
