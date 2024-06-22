import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import { ApiProfile, IUser } from 'shared/models/IUser';
import API from 'shared/api/interceptors';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';
import { userArrayConverting } from 'shared/api/converteitions';

const getAllFriends = createAsyncThunk<IUser[], number, IConfigAsyncThunk>(
  'auth/getAllFriends',
  (id, { rejectWithValue, dispatch }) => {
    return API<ApiProfile[]>({
      url: `api/users/allFriends/${id}`,
    })
      .then(({ data }) => {
        return userArrayConverting(data);
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

export default getAllFriends;
