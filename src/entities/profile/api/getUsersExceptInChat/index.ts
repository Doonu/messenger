import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { AxiosError } from 'axios';
import { ApiProfile, IUser, userArrayConverting } from '@entities/friends';
import { API } from '@shared/api';

import { IGetUsersExceptInChat } from './getUsersExceptInChat.types';

export const getUsersExceptInChat = createAsyncThunk<
  IUser[],
  IGetUsersExceptInChat,
  IConfigAsyncThunk
>('users/getUsersExceptInChat', async ({ exceptions, search, page }, { rejectWithValue }) => {
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
