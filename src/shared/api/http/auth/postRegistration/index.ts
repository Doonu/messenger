import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk, IError, IRegister } from '@shared/models';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

import { ApiRegister, IPostRegister } from './postRegistration.type';

export const postRegistration = createAsyncThunk<IPostRegister, IRegister, IConfigAsyncThunk>(
  'index/Index',
  ({ email, password, name }, { rejectWithValue, dispatch }) => {
    return API<ApiRegister>({
      url: `api/auth/registration`,
      method: 'POST',
      data: { email, password, name },
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
