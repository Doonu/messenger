import { IConfigAsyncThunk, IError } from '@shared/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';
import { IPostState } from '@entities/post';

import { IRestorePostById } from './restorePostById.type';

export const restorePostById = createAsyncThunk<IPostState, IRestorePostById, IConfigAsyncThunk>(
  'post/restore',
  async ({ postId }, { rejectWithValue, dispatch }) => {
    return API<IPostState>({
      url: `api/posts/restore/${postId}`,
      method: 'POST',
    })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }: AxiosError<IError>) => {
        dispatch(
          showMessage({
            title: `Неудалось восстановить пост`,
            type: 'warning',
            level: 'medium',
          })
        );

        return rejectWithValue(response?.data);
      });
  }
);
