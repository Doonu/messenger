import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, userConverting } from '@shared/api';
import { APINotifyItem, INotifyItem, IConfigAsyncThunk } from '@shared/models';

import { IGetAllNotification } from './getAllNotification.type';

export const getAllNotification = createAsyncThunk<
  INotifyItem[],
  IGetAllNotification,
  IConfigAsyncThunk
>('Notification/getAll', ({ limit, page }, { rejectWithValue }) => {
  return API<APINotifyItem[]>({
    url: 'api/notifications',
    method: 'GET',
    params: { page, limit },
  })
    .then(({ data }) => {
      return data.map(({ id, createdAt, content, sender }) => {
        return {
          id,
          content,
          createdAt,
          sender: userConverting(sender),
        };
      });
    })
    .catch(({ response }) => {
      return rejectWithValue(response?.data);
    });
});
