import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '../../../models/errors';
import { ApiProfile, IUser } from '../../../models/IUser';
import API from '../../interceptors';
import { AxiosError } from 'axios';
import { showMessage } from '../../../../entities/notification/notification.slice';

const getFriends = createAsyncThunk<IUser[], number, IConfigAsyncThunk>(
  'aurh/getFriends',
  (id, { rejectWithValue, dispatch }) => {
    return API<ApiProfile[]>({
      url: `api/users/friends/${id}`,
    })
      .then(({ data }) => {
        return data.map((user) => ({
          name: user.name,
          email: user.email,
          banned: user.banned,
          id: user.id,
          banReason: user.banReason,
          avatar: user.imgSubstitute || 'тут будет картинка',
          friends: user.friends,
          roles: user?.roles?.map(({ value, createdAt }) => {
            return {
              value,
              createdAt,
            };
          }),
        }));
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

export default getFriends;
