import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError, IToggleCommentsById } from '@shared/models';
import { API } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

export const toggleCommentsById = createAsyncThunk<
  IToggleCommentsById,
  IToggleCommentsById,
  IConfigAsyncThunk
>('Index/toggle-comments', ({ postId, isDisabledComments }, { rejectWithValue, dispatch }) => {
  return API<IToggleCommentsById>({
    url: `api/posts/toggle-comments`,
    method: 'PATCH',
    data: { postId, isDisabledComments },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }: AxiosError<IError>) => {
      const customMessage = `У вас нет прав для ${
        isDisabledComments ? 'разблокировки' : 'блокировки'
      } комментариев`;

      dispatch(
        showMessage({
          title: customMessage,
          type: 'warning',
          level: 'medium',
        })
      );

      return rejectWithValue(response?.data);
    });
});
