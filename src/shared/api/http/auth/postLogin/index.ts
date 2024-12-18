import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk, IError, ILogin } from '@shared/models';
import { AxiosError } from 'axios';

import { ApiLogin, IPostLogin } from './postLogin.type';

// TODO: доделать
export const postLogin = createAsyncThunk<IPostLogin, ILogin, IConfigAsyncThunk>(
  'auth/Login',
  ({ email, password }, { rejectWithValue }) => {
    return API<ApiLogin>({
      url: `api/auth/login`,
      method: 'POST',
      data: { email, password },
    })
      .then(({ data }) => {
        return {
          token: data.token,
        };
      })
      .catch(({ response }: AxiosError<IError>) => {
        // const title = response.data || 'Неизвестная ошибка';
        //
        // dispatch(
        //   showMessage({
        //     title,
        //     type: 'error',
        //     level: 'medium',
        //   })
        // );

        return rejectWithValue(response?.data);
      });
  }
);
