import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { API, userArrayConverting } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';
import { ApiProfile, IUser } from '@entities/friends';

export const getAllFriends = createAsyncThunk<IUser[], number, IConfigAsyncThunk>(
  'user/getAllFriends',
  async (id, { rejectWithValue, dispatch }) => {
    return API<ApiProfile[]>({
      url: `api/users/allFriends/${id}`,
    })
      .then(({ data }) => {
        return userArrayConverting(data);
      })
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
