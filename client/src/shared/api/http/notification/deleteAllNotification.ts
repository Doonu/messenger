import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '../../../models/errors';
import API from '../../interceptors';

const deleteAllNotifications = createAsyncThunk<number, number, IConfigAsyncThunk>(
  'deleteAllNotifications',
  (userId, { rejectWithValue }) => {
    return API({
      url: `api/notifications/user/${userId}`,
      method: 'DELETE',
    })
      .then(() => userId)
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default deleteAllNotifications;
