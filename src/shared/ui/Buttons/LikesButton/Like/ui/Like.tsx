import React, { FC } from 'react';

import { ILike } from '../model/likeButton.types';
import { SBgLikeButton, SButton, SLikeButton, SText } from './like.styles';

export const Like: FC<ILike> = ({ isLike, children, onClick, ...props }) => {
  return (
    <SButton onClick={onClick} isLike={isLike} {...props}>
      {!isLike && <SLikeButton />}
      {isLike && <SBgLikeButton />}
      <SText>{children}</SText>
    </SButton>
  );
};
