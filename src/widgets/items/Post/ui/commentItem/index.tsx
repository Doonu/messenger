import React, { ChangeEvent, FC, useState } from 'react';
import { postTime, convertName } from '@shared/util';
import { BaseButton, PhotoProfile, Slice } from '@shared/components';
import { BgLike, Close, Like, Redaction } from '@shared/assets';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { useNavigate } from 'react-router-dom';
import { likeComments, updateComment } from '@entities/comment';

import { ICommentItem } from '../../model/ICommentItem';
import { SAutosizeInput } from '../comments/comments.styled';
import {
  SContainer,
  SName,
  STime,
  SInfo,
  SDelete,
  SContainerHandle,
  SLike,
  SIcon,
  SNameContainer,
  SContainerButtons,
  SContainerEdit,
  SComment,
  SContainerRow,
} from './commentItem.styled';

// TODO: eslint
const CommentItem: FC<ICommentItem> = ({
  comment,
  onDelete,
  onEdit,
  handlerEdit,
  userPostId,
  setComments,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useAppSelector(selectorProfile);

  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isLike, setIsLike] = useState(comment.likesList.includes(id));
  const [editContent, setEditContent] = useState(comment.content.join('\n'));

  const convertedName = convertName(comment.author.name);

  const visibleRemove = comment.author.id === id || userPostId === id;
  const visibleEdit = comment.author.id === id;

  const handlerLike = () => {
    dispatch(likeComments(comment.id))
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(({ isLike }) => {
        setComments((comments) => {
          return comments.map((prevComment) => {
            if (prevComment.id === comment.id) {
              return {
                ...prevComment,
                countLikes: isLike ? prevComment.countLikes + 1 : prevComment.countLikes - 1,
              };
            }
            return prevComment;
          });
        });
      })
      .finally(() => setIsLike((prev) => !prev));
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleUpdateComment = () => {
    if (!editContent) {
      handlerEdit(null);
      return;
    }

    dispatch(updateComment({ commentId: comment.id, content: editContent.split('\n') })).then(
      () => {
        handlerEdit(editContent, comment.id);
        setEditContent(editContent);
      }
    );
  };

  const handlerCansel = () => {
    handlerEdit(null);
    setEditContent(comment.content.join('\n'));
  };

  const handlerView = () => setIsShowInfo(false);
  const handlerHidden = () => setIsShowInfo(true);

  return (
    <SContainer onMouseLeave={handlerView} onMouseEnter={handlerHidden}>
      <PhotoProfile img={comment.author.imgSubstitute} name={comment.author.name} />
      <SInfo>
        <SNameContainer>
          <SName onClick={() => navigate(`/profile/${comment.author.id}`)}>{convertedName}</SName>
          {comment.isEdit && <span>редактирование комментария</span>}
        </SNameContainer>
        {comment.isEdit && (
          <SContainerEdit>
            <SAutosizeInput
              minRows={1}
              maxRows={5}
              isDrag={false}
              value={editContent}
              onChange={handleChangeContent}
              $position
              placeholder="Написать комментарий..."
              draggable="false"
              // bordered={false}
            />
            <SContainerButtons>
              <BaseButton onClick={handlerCansel} bgTransparent>
                Отмена
              </BaseButton>
              <BaseButton onClick={handleUpdateComment}>Сохранить</BaseButton>
            </SContainerButtons>
          </SContainerEdit>
        )}
        {!comment.isEdit && (
          <SComment>
            <Slice padding={false} content={comment.content} />
            <STime>{postTime(comment.createdAt)}</STime>
          </SComment>
        )}
      </SInfo>
      {!comment.isEdit && (
        <SContainerHandle>
          <SContainerRow $isView={isShowInfo}>
            {visibleEdit && (
              <SIcon onClick={onEdit}>
                <Redaction />
              </SIcon>
            )}
            {visibleRemove && (
              <SDelete onClick={onDelete}>
                <Close />
              </SDelete>
            )}
          </SContainerRow>
          <SLike onClick={handlerLike}>
            {!isLike && <Like />}
            {isLike && <BgLike color="red" />}
            {comment.countLikes}
          </SLike>
        </SContainerHandle>
      )}
    </SContainer>
  );
};

export default CommentItem;
