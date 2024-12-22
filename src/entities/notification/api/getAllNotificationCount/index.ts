import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk } from '@shared/models';

export const getAllNotificationCount = createAsyncThunk<number, undefined, IConfigAsyncThunk>(
  'notification/getAllCount',
  async (_, { rejectWithValue }) => {
    return API<number>({
      url: 'api/notifications/count',
      method: 'GET',
    })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);
