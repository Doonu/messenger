import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiProfile, IUser } from 'shared/models/IUser';
import { IConfigAsyncThunk, IError } from '../../../models/errors';
import API from '../../interceptors';
import { userArrayConverting } from '../../../converteitions';
import { AxiosError } from 'axios';

interface IGetUsersExceptInChat {
  page: number;
  search: string;
  exceptions: number[];
}

const getUsersExceptInChat = createAsyncThunk<IUser[], IGetUsersExceptInChat, IConfigAsyncThunk>(
  'users/getUsersExceptInChat',
  ({ exceptions, search, page }, { rejectWithValue }) => {
    return API<ApiProfile[]>({
      url: `api/users/allUsersExceptions`,
      method: 'POST',
      data: { exceptions: exceptions, search: search, page: page },
    })
      .then(({ data }) => {
        return userArrayConverting(data);
      })
      .catch(({ response }: AxiosError<IError>) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getUsersExceptInChat;
