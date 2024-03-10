import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../interceptors';

import { IConfigAsyncThunk, IError } from '../../../models/errors';
import { AxiosError } from 'axios';
import { showMessage } from '../../../../entities/notification/notification.slice';
import { logout } from '../../../../entities/auth/auth.slice';
import { ApiProfile, IUser } from '../../../models/IUser';

const getProfile = createAsyncThunk<IUser, undefined, IConfigAsyncThunk>(
  'auth/getProfile',
  (_, { rejectWithValue, dispatch }) => {
    return API<ApiProfile>({
      url: `api/users/profile`,
      method: 'POST',
    })
      .then(({ data }) => ({
        name: data.name,
        email: data.email,
        banned: data.banned,
        id: data.id,
        banReason: data.banReason,
        avatar: data.imgSubstitute || 'тут будет картинка',
        friends: data.friends,
        statusConnected: data.statusConnected,
        timeConnected: data.timeConnected,
        roles: data.roles.map(({ value, createdAt }) => {
          return {
            value,
            createdAt,
          };
        }),
      }))
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
