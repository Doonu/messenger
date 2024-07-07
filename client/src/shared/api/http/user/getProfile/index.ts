import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, userConverting } from '@shared/api';
import { IConfigAsyncThunk, IError, ApiProfile, IUser } from '@shared/models';
import { AxiosError } from 'axios';
import { logout } from '@entities/auth';

export const getProfile = createAsyncThunk<IUser, undefined, IConfigAsyncThunk>(
  'index/getProfile',
  (_, { rejectWithValue, dispatch }) => {
    return API<ApiProfile>({
      url: `api/users/profile`,
      method: 'POST',
    })
      .then(({ data }) => userConverting(data))
      .catch(({ response }: AxiosError<IError>) => {
        // const title = response?.data || 'Неизвестная ошибка';
        dispatch(logout());
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
