import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { IGetFriendRequest } from 'shared/models/IUser';

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
