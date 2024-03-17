import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '../../../models/errors';
import API from '../../interceptors';

const deleteNotification = createAsyncThunk<number, number, IConfigAsyncThunk>(
  'notification/delete',
  (notificationId, { rejectWithValue }) => {
    return API({
      url: `api/notifications/${notificationId}`,
      method: 'DELETE',
    })
      .then(() => notificationId)
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default deleteNotification;
