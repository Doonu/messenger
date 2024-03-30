import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'shared/models/IUser';
import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';

const deleteFriend = createAsyncThunk<IUser, number, IConfigAsyncThunk>(
  'auth/deleteFriends',
  (id, { rejectWithValue, dispatch }) => {
    return API<IUser>({
      url: `api/users/friends/${id}`,
      method: 'DELETE',
    })
      .then(({ data }) => data)
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

export default deleteFriend;
