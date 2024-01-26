import React, { ChangeEvent, FC, useState } from 'react';
import {
  SContainer,
  SContent,
  SName,
  STime,
  SInfo,
  SDelete,
  SContainerHandle,
  SLike,
  SContainerColumn,
  SIcon,
  SNameContainer,
  SContainerButtons,
  SContainerEdit,
} from './commentItem.styled';
import { postTime } from '../../../../shared/util/time';
import PhotoProfile from '../../../../components/ui/profiles/photo';
import { convertName } from '../../../../shared/util/user';
import { BgLike, Close, Like, Redaction } from '../../../../shared/assets/icons';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import likeComments from '../../../../shared/api/comments/likeComments';
import { SAutosizeInput } from '../comments/comments.styled';
import { selectorUser } from '../../../../entities/user/user.selectors';
import BaseButton from '../../../../components/ui/buttons/baseButton';
import updateComment from '../../../../shared/api/comments/updateComment';
import { ICommentItem } from '../../model/ICommentItem';

const CommentItem: FC<ICommentItem> = ({ comment, onDelete, onEdit, handlerEdit, userPostId }) => {
  const dispatch = useAppDispatch();

  const { id } = useAppSelector(selectorUser);

  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isLike, setIsLike] = useState(comment.likesList.includes(+id));
  const [editContent, setEditContent] = useState(comment.content.join('\n'));

  const convertedName = convertName(comment.author.name);

  const visibleRemove = comment.author.id === +id || userPostId === +id;
  const visibleEdit = comment.author.id === +id;

  const handlerLike = () => {
    dispatch(likeComments(comment.id)).finally(() => setIsLike((prev) => !prev));
  };

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
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
      <PhotoProfile img={comment.author.imgSubstitute}>{comment.author.name[0]}</PhotoProfile>
      <SInfo>
        <SNameContainer>
          <SName>{convertedName}</SName>
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
              $position={true}
              placeholder="Написать комментарий..."
              draggable="false"
            />
            <SContainerButtons>
              <BaseButton onClick={handlerCansel} bgTransparent={true}>
                Отмена
              </BaseButton>
              <BaseButton onClick={handleUpdateComment}>Сохранить</BaseButton>
            </SContainerButtons>
          </SContainerEdit>
        )}
        {!comment.isEdit && (
          <>
            <SContent>
              {comment.content.map((row) => (
                <div key={row}>{row}</div>
              ))}
            </SContent>
            <STime>{postTime(comment.createdAt)}</STime>
          </>
        )}
      </SInfo>
      {!comment.isEdit && (
        <SContainerHandle $isView={isShowInfo}>
          {visibleEdit && (
            <SIcon onClick={onEdit}>
              <Redaction />
            </SIcon>
          )}
          <SContainerColumn>
            {visibleRemove && (
              <SDelete onClick={onDelete}>
                <Close />
              </SDelete>
            )}
            <SLike onClick={handlerLike}>
              {!isLike && <Like />}
              {isLike && <BgLike color={'red'} />}
            </SLike>
          </SContainerColumn>
        </SContainerHandle>
      )}
    </SContainer>
  );
};

export default CommentItem;
