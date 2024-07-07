import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

import { ApiLogin, ILogin, IPostLogin } from './postLogin.type';

export const postLogin = createAsyncThunk<IPostLogin, ILogin, IConfigAsyncThunk>(
  'index/Index',
  ({ email, password }, { rejectWithValue, dispatch }) => {
    return API<ApiLogin>({
      url: `api/auth/login`,
      method: 'POST',
      data: { email, password },
    })
      .then(({ data }) => {
        localStorage.setItem(
          'session',
          JSON.stringify({
            at: data.token,
          })
        );

        return {
          token: data.token,
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
