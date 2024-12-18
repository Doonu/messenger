import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, ILikePost } from '@shared/models';
import { API } from '@shared/api';

export const likePost = createAsyncThunk<ILikePost, number, IConfigAsyncThunk>(
  'post/Like',
  (postId, _) => {
    return API<ILikePost>({
      url: `api/posts/like`,
      method: 'PATCH',
      data: { postId },
    }).then(({ data }) => {
      return data;
    });
  }
);
