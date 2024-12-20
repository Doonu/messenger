import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

import { IAuthState, ILogin } from '../../model/auth.types';

// TODO: доделать
export const postLogin = createAsyncThunk<IAuthState, ILogin, IConfigAsyncThunk>(
  'auth/Login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    return API<IAuthState>({
      url: `api/auth/login`,
      method: 'POST',
      data: { email, password },
    })
      .then(({ data }) => {
        return {
          accessToken: data.accessToken,
        };
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
