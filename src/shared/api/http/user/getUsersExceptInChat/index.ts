import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiProfile, IUser, IConfigAsyncThunk, IError } from '@shared/models';
import { AxiosError } from 'axios';
import { userArrayConverting, API } from '@shared/api';

import { IGetUsersExceptInChat } from './getUsersExceptInChat.type';

export const getUsersExceptInChat = createAsyncThunk<
  IUser[],
  IGetUsersExceptInChat,
  IConfigAsyncThunk
>('Users/getUsersExceptInChat', ({ exceptions, search, page }, { rejectWithValue }) => {
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
