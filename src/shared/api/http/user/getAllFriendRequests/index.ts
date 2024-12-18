import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, userConverting } from '@shared/api';
import { IConfigAsyncThunk, APIAllFriendRequests, IAllFriendRequests } from '@shared/models';

export const getAllFriendRequests = createAsyncThunk<
  IAllFriendRequests[],
  undefined,
  IConfigAsyncThunk
>('index/getAllFriendRequest', (_, { rejectWithValue }) => {
  return API<APIAllFriendRequests[]>({
    url: `api/users/friendsAllRequests`,
    method: 'POST',
  })
    .then(({ data }) =>
      data.map((request) => ({
        id: request.id,
        createdAt: request.createdAt,
        sender: userConverting(request.sender),
      }))
    )
    .catch(({ response }) => rejectWithValue(response?.data));
});
