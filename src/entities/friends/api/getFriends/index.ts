import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { API } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';
import { ApiProfile, IUser, userArrayConverting } from '@entities/friends';

import { IGetFriends } from './getFriends.types';

export const getFriends = createAsyncThunk<IUser[], IGetFriends, IConfigAsyncThunk>(
  'user/getFriends',
  async ({ page, id, search }, { rejectWithValue, dispatch }) => {
    return API<ApiProfile[]>({
      url: `api/users/friends/${id}`,
      params: { page, search },
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
