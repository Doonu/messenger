import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { ILikePost } from '@entities/dialogs';

export const likePost = createAsyncThunk<ILikePost, number, IConfigAsyncThunk>(
  'post/Like',
  async (postId) => {
    return API<ILikePost>({
      url: `api/posts/like`,
      method: 'PATCH',
      data: { postId },
    }).then(({ data }) => {
      return data;
    });
  }
);
