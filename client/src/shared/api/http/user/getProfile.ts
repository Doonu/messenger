import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';

import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';
import { logout } from 'entities/auth/auth.slice';
import { ApiProfile, IUser } from 'shared/models/IUser';
import { userConverting } from 'shared/converteitions';

const getProfile = createAsyncThunk<IUser, undefined, IConfigAsyncThunk>(
  'auth/getProfile',
  (_, { rejectWithValue, dispatch }) => {
    return API<ApiProfile>({
      url: `api/users/profile`,
      method: 'POST',
    })
      .then(({ data }) => userConverting(data))
      .catch(({ response }: AxiosError<IError>) => {
        const title = response?.data.message || 'Неизвестная ошибка';
        dispatch(logout());
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

export default getProfile;
