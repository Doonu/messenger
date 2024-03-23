import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../interceptors';
import { INotifyItem } from '../../../models/INotification';
import { IConfigAsyncThunk } from '../../../models/errors';
import { ApiProfile } from '../../../models/IUser';
import { userConverting } from '../../../converteitions';

export interface APINotifyItem {
  id: number;
  content: string;
  createdAt: string;
  sender: ApiProfile;
}

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
