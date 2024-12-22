import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { ICommentsState } from '@entities/post';

import { ICreateComment } from './createComment.types';

export const createComment = createAsyncThunk<ICommentsState, ICreateComment, IConfigAsyncThunk>(
  'comments/createComment',
  async ({ content, postId }, { rejectWithValue }) => {
    return API<ICommentsState>({
      url: `api/posts/comments`,
      method: 'POST',
      data: { content, postId },
    })
      .then(({ data }) => {
        return {
          ...data,
          isEdit: false,
        };
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);
