import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILikeComments, IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

export const likeComments = createAsyncThunk<ILikeComments, number, IConfigAsyncThunk>(
  'comments/Like',
  (commentId, _) => {
    return API<ILikeComments>({
      url: `api/posts/comments/like`,
      method: 'PATCH',
      data: { commentId },
    }).then(({ data }) => data);
  }
);
