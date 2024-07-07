import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk, IGetFriendRequest } from '@shared/models';
import { API } from '@shared/api';

export const getFriendRequest = createAsyncThunk<IGetFriendRequest, number, IConfigAsyncThunk>(
  'index/getFriendRequest',
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
