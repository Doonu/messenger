import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetUsersExceptFriends, IUserExcept } from 'shared/models/IUser';
import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { userConverting } from 'shared/converteitions';
import { AxiosError } from 'axios';

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
