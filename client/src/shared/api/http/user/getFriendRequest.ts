import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '../../../models/errors';
import API from '../../interceptors';

export interface IGetFriendRequest {
  status: string | boolean;
  reqId?: number;
}

const getFriendRequest = createAsyncThunk<IGetFriendRequest, number, IConfigAsyncThunk>(
  'auth/getFriendRequest',
  (id, { rejectWithValue }) => {
    return API<IGetFriendRequest>({
      url: `api/users/friendsRequest/${id}`,
    })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => rejectWithValue(response?.data));
  }
);

export default getFriendRequest;
