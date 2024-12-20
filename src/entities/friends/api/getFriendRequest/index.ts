import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { IGetFriendRequest } from '@entities/friends';

export const getFriendRequest = createAsyncThunk<IGetFriendRequest, number, IConfigAsyncThunk>(
  'user/getFriendRequest',
  async (id, { rejectWithValue }) => {
    return API<IGetFriendRequest>({
      url: `api/users/friendsRequest/${id}`,
    })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => rejectWithValue(response?.data));
  }
);
