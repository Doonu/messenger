import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFriends, IUser } from '@entities/friends';

import { FriendsState } from './friends.types';

const initialState: FriendsState = {
  friends: [],
  isError: false,
  page: 1,
  isHaseMore: true,
  isLoading: false,
  search: '',
};

const FriendsSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setAllFriends: (state, { payload }: PayloadAction<IUser[]>) => {
      state.friends = payload;
      state.isLoading = true;
      state.isHaseMore = true;
      state.page = 1;
    },
    addPage: (state) => {
      state.page += 1;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    addFriend: (state, { payload }: PayloadAction<IUser>) => {
      state.friends = [payload, ...state.friends];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.fulfilled, (state, { payload }) => {
      if (payload.length === 0) state.isHaseMore = false;
      if (payload.length !== 0 && state.page !== 1) state.friends = [...state.friends, ...payload];
      if (state.page === 1) state.friends = payload;

      state.isLoading = false;
    });
    builder.addCase(getFriends.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFriends.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { setAllFriends, addPage, setSearch, addFriend } = FriendsSlice.actions;
export default FriendsSlice.reducer;
