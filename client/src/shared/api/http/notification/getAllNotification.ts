import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../interceptors';
import { INotifyItem } from '../../../../entities/notification/model/INotification';
import { IConfigAsyncThunk } from '../../../models/errors';
import { ApiProfile } from '../../../models/IUser';

export interface APINotifyItem {
  id: number;
  content: string;
  createdAt: string;
  sender: Omit<ApiProfile, 'roles'>;
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
            sender: {
              name: sender.name,
              email: sender.email,
              banned: sender.banned,
              id: sender.id,
              banReason: sender.banReason,
              avatar: sender.imgSubstitute || 'тут будет картинка',
              friends: sender.friends,
              statusConnected: sender.statusConnected,
              timeConnected: sender.timeConnected,
            },
          };
        });
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllNotification;
