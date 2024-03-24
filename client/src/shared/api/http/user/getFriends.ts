import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '../../../models/errors';
import { ApiProfile, IUser } from '../../../models/IUser';
import API from '../../interceptors';
import { AxiosError } from 'axios';
import { showMessage } from '../../../../entities/notification/notification.slice';
import { userConvertingArray } from '../../../converteitions';

interface IGetFriends {
  id: number;
  page: number;
  search: string;
}

const getFriends = createAsyncThunk<IUser[], IGetFriends, IConfigAsyncThunk>(
  'auth/getFriends',
  ({ page, id, search }, { rejectWithValue, dispatch }) => {
    return API<ApiProfile[]>({
      url: `api/users/friends/${id}`,
      params: { page: page, search: search },
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

export default getFriends;
