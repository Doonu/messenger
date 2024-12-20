import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

import { IAuthState, IRegister } from '../../model/auth.types';

export const postRegistration = createAsyncThunk<IAuthState, IRegister, IConfigAsyncThunk>(
  'auth/registration',
  async ({ email, password, userName }, { rejectWithValue, dispatch }) => {
    return API<IAuthState>({
      url: `api/auth/registration`,
      method: 'POST',
      data: { email, password, name: userName },
    })
      .then(({ data }) => ({
        accessToken: data.accessToken,
      }))
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
