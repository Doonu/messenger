import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';
import { IConfigAsyncThunk, IError } from '../../../models/errors';
import API from '../../interceptors';
import { AxiosError } from 'axios';
import { showMessage } from '../../../../entities/notification/notification.slice';

export interface ApiProfile {
  name: string;
  email: string;
  banned: boolean;
  banReason: null | string;
  id: number;
  roles: {
    id: number;
    value: string;
    description: string;
    createdAt: string;
  }[];
  imgSubstitute: string;
  friends: number[];
}

const getUser = createAsyncThunk<IUser, number, IConfigAsyncThunk>(
  'auth/getUser',
  (id, { rejectWithValue, dispatch }) => {
    return API<ApiProfile>({
      url: `api/users/${id}`,
      method: 'GET',
    })
      .then(({ data }) => ({
        name: data.name,
        email: data.email,
        banned: data.banned,
        id: data.id,
        banReason: data.banReason,
        avatar: data.imgSubstitute || 'тут будет картинка',
        friends: data.friends,
        roles: data.roles.map(({ value, createdAt }) => {
          return {
            value,
            createdAt,
          };
        }),
      }))
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

export default getUser;
