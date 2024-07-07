import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IConfigAsyncThunk, IError } from '@shared/models';
import { API } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

export const deleteFriend = createAsyncThunk<IUser, number, IConfigAsyncThunk>(
  'index/deleteFriends',
  (id, { rejectWithValue, dispatch }) => {
    return API<IUser>({
      url: `api/users/friends/${id}`,
      method: 'DELETE',
    })
      .then(({ data }) => data)
      .catch(({ response }: AxiosError<IError>) => {
        const title = response?.data.message || 'Неизвестная ошибка';
        dispatch(
          showMessage({
            title,
            type: 'error',
            level: 'medium',
          })
        );
        return rejectWithValue(response?.data);
      });
  }
);
