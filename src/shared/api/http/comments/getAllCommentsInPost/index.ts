import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentsState } from '@entities/post';
import { API } from '@shared/api';
import { IConfigAsyncThunk } from '@shared/models';

import { IGetAllCommentsInPost } from './getAllCommentsInPost.type';

export const getAllCommentsInPost = createAsyncThunk<
  ICommentsState[],
  IGetAllCommentsInPost,
  IConfigAsyncThunk
>('comments/getAll', ({ postId, orderDirection, orderBy, page, limit }, { rejectWithValue }) => {
  return API<ICommentsState[]>({
    url: `api/posts/comments/${postId}`,
    method: 'GET',
    params: { orderBy, orderDirection, page, limit },
  })
    .then(({ data }) => {
      return data.map((comment) => {
        return {
          ...comment,
          isEdit: false,
        };
      });
    })
    .catch(({ response }) => {
      return rejectWithValue(response?.data);
    });
});
