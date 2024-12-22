import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

export const deleteNotification = createAsyncThunk<number, number, IConfigAsyncThunk>(
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
