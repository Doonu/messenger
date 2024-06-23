import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';
import { ApiLogin, ILogin, IPostLogin } from './postLogin.type';

import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';

const postLogin = createAsyncThunk<IPostLogin, ILogin, IConfigAsyncThunk>(
  'auth/login',
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
            title: title,
            type: 'error',
            level: 'medium',
          })
        );

        return rejectWithValue(response?.data);
      });
  }
);

export default postLogin;
