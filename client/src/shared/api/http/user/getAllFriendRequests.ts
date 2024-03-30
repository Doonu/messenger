import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../interceptors';
import { IConfigAsyncThunk } from '../../../models/errors';
import { userConverting } from '../../../converteitions';
import { APIAllFriendRequests, IAllFriendRequests } from '../../../models/IFriendRequest';

const getAllFriendRequests = createAsyncThunk<IAllFriendRequests[], undefined, IConfigAsyncThunk>(
  'auth/getAllFriendRequest',
  (_, { rejectWithValue }) => {
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
  }
);

export default getAllFriendRequests;
