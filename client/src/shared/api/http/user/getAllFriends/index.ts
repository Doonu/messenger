import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError, ApiProfile, IUser } from '@shared/models';
import { API, userArrayConverting } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

export const getAllFriends = createAsyncThunk<IUser[], number, IConfigAsyncThunk>(
  'index/getAllFriends',
  (id, { rejectWithValue, dispatch }) => {
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
