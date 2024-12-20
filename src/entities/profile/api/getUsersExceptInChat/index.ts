import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { AxiosError } from 'axios';
import { userArrayConverting, API } from '@shared/api';
import { ApiProfile, IUser } from '@entities/friends';

import { IGetUsersExceptInChat } from './getUsersExceptInChat.type';

export const getUsersExceptInChat = createAsyncThunk<
  IUser[],
  IGetUsersExceptInChat,
  IConfigAsyncThunk
>('Users/getUsersExceptInChat', async ({ exceptions, search, page }, { rejectWithValue }) => {
  return API<ApiProfile[]>({
    url: `api/users/allUsersExceptions`,
    method: 'POST',
    data: { exceptions, search, page },
  })
    .then(({ data }) => {
      return userArrayConverting(data);
    })
    .catch(({ response }: AxiosError<IError>) => {
      return rejectWithValue(response?.data);
    });
});
