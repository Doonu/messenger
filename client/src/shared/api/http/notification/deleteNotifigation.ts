import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '../../../models/errors';
import API from '../../interceptors';

const deleteNotification = createAsyncThunk<undefined, number, IConfigAsyncThunk>(
  'notification/delete',
  (senderId, { rejectWithValue }) => {
    return API({
      url: `api/notifications/${senderId}`,
      method: 'DELETE',
    })
      .then(() => undefined)
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default deleteNotification;
