import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentsState } from '@entities/post';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

import { IUpdateComment } from './updateComment.types';

export const updateComment = createAsyncThunk<ICommentsState, IUpdateComment, IConfigAsyncThunk>(
  'comments/updateComment',
  async ({ content, commentId }, { rejectWithValue }) => {
    return API<ICommentsState>({
      url: `api/posts/comments`,
      method: 'PUT',
      data: { commentId, content },
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
