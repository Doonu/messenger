import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { ILikeComments } from '@entities/dialogs';

export const likeComments = createAsyncThunk<ILikeComments, number, IConfigAsyncThunk>(
  'comments/Like',
  async (commentId) => {
    return API<ILikeComments>({
      url: `api/posts/comments/like`,
      method: 'PATCH',
      data: { commentId },
    }).then(({ data }) => data);
  }
);
