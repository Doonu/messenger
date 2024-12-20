import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { API, userConverting } from '@shared/api';
import { AxiosError } from 'axios';
import { ApiGetUsersExceptFriends, IUserExcept } from '@entities/friends';

import { IGetUsersExceptFriends } from './getUsersExceptFriends.type';

export const getUsersExceptFriends = createAsyncThunk<
  IUserExcept[],
  IGetUsersExceptFriends,
  IConfigAsyncThunk
>('user/usersExceptFriends', async ({ page, search }, { rejectWithValue }) => {
  return API<ApiGetUsersExceptFriends[]>({
    url: `api/users/usersExceptFriends`,
    method: 'POST',
    data: { search, page },
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
