import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';
import { IConfigAsyncThunk } from 'shared/models/errors';

const getAllNotificationCount = createAsyncThunk<number, undefined, IConfigAsyncThunk>(
  'notification/getAllCount',
  (_, { rejectWithValue }) => {
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

export default getAllNotificationCount;
