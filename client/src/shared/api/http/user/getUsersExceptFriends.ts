import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiProfile, IUser } from '../../../models/IUser';
import { IConfigAsyncThunk, IError } from '../../../models/errors';
import API from '../../interceptors';
import { userConverting } from '../../../converteitions';
import { AxiosError } from 'axios';

interface IGetUsersExceptFriends {
  user: ApiProfile;
  isSendFriend: boolean;
}

export interface IUserExcept extends IUser {
  isSendFriend?: boolean;
}

const getUsersExceptFriends = createAsyncThunk<IUserExcept[], string, IConfigAsyncThunk>(
  'auth/usersExceptFriends',
  (search, { rejectWithValue }) => {
    return API<IGetUsersExceptFriends[]>({
      url: `api/users/usersExceptFriends`,
      method: 'POST',
      data: { search: search },
    })
      .then(({ data }) => {
        return data.map(({ user, isSendFriend }) => ({
          ...userConverting(user),
          isSendFriend,
        }));
      })
      .catch(({ response }: AxiosError<IError>) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getUsersExceptFriends;
