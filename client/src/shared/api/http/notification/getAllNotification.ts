import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';
import { APINotifyItem, INotifyItem } from 'shared/models/INotification';
import { IConfigAsyncThunk } from 'shared/models/errors';
import { userConverting } from 'shared/converteitions';

const getAllNotification = createAsyncThunk<INotifyItem[], undefined, IConfigAsyncThunk>(
  'notification/getAll',
  (_, { rejectWithValue }) => {
    return API<APINotifyItem[]>({
      url: 'api/notifications',
      method: 'GET',
    })
      .then(({ data }) => {
        return data.map(({ id, createdAt, content, sender }) => {
          return {
            id: id,
            content: content,
            createdAt: createdAt,
            sender: userConverting(sender),
          };
        });
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllNotification;
