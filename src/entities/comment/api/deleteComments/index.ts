import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentsState } from '@entities/post';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { showMessage } from '@entities/notification';

export const deleteComments = createAsyncThunk<ICommentsState, number, IConfigAsyncThunk>(
  'comments/deleteComment',
  async (postId, { rejectWithValue, dispatch }) => {
    return API<ICommentsState>({
      url: `api/posts/comments/${postId}`,
      method: 'DELETE',
    })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        let message = 'Неудалось удалить пост';
        if (response?.status === 401) {
          message = 'У вас нет прав на удаления комментария';
        }

        dispatch(
          showMessage({
            title: message,
            type: 'warning',
            level: 'medium',
          })
        );

        return rejectWithValue(response.data);
      });
  }
);
