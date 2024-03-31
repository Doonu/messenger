import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';
import { APINotifyItem, INotifyItem } from 'shared/models/INotification';
import { IConfigAsyncThunk } from 'shared/models/errors';
import { userConverting } from 'shared/converteitions';

interface IGetAllNotification {
  page: number;
  limit: number;
}

const getAllNotification = createAsyncThunk<INotifyItem[], IGetAllNotification, IConfigAsyncThunk>(
  'notification/getAll',
  ({ limit, page }, { rejectWithValue }) => {
    return API<APINotifyItem[]>({
      url: 'api/notifications',
      method: 'GET',
      params: { page, limit },
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
