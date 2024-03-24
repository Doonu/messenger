import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '../../../models/errors';
import { ApiProfile, IUser } from '../../../models/IUser';
import API from '../../interceptors';
import { AxiosError } from 'axios';
import { showMessage } from '../../../../entities/notification/notification.slice';
import { userConvertingArray } from '../../../converteitions';

const getAllFriends = createAsyncThunk<IUser[], number, IConfigAsyncThunk>(
  'auth/getAllFriends',
  (id, { rejectWithValue, dispatch }) => {
    return API<ApiProfile[]>({
      url: `api/users/allFriends/${id}`,
    })
      .then(({ data }) => {
        return userConvertingArray(data);
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
