import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiGetUsersExceptFriends, IUserExcept } from 'shared/models/IUser';
import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { userConverting } from 'shared/api/converteitions';
import { AxiosError } from 'axios';

interface IGetUsersExceptFriends {
  page: number;
  search: string;
}

const getUsersExceptFriends = createAsyncThunk<
  IUserExcept[],
  IGetUsersExceptFriends,
  IConfigAsyncThunk
>('auth/usersExceptFriends', ({ page, search }, { rejectWithValue }) => {
  return API<ApiGetUsersExceptFriends[]>({
    url: `api/users/usersExceptFriends`,
    method: 'POST',
    data: { search: search, page: page },
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
});

export default getUsersExceptFriends;
