import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { API, userConverting } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';
import { ApiProfile, IUser } from '@entities/friends';

import { ValidationSchema } from './getUser.validation';

export const getUser = createAsyncThunk<IUser, number, IConfigAsyncThunk>(
  'user/getUser',
  async (id, { rejectWithValue, dispatch }) => {
    return API<ApiProfile>({
      url: `api/users/${id}`,
      method: 'GET',
    })
      .then(({ data }) => {
        const isValid = ValidationSchema.isValidSync(data);

        if (!isValid) {
          console.warn(ValidationSchema.validateSync(data));
        }

        return userConverting(data);
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
