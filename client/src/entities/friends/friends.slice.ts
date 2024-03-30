import { IUser } from 'shared/models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getFriends from 'shared/api/http/user/getFriends';

interface friendsState {
  friends: IUser[];
  page: number;
  error: boolean;
  haseMore: boolean;
  loading: boolean;

  search: string;
}

const initialState: friendsState = {
  friends: [],
  error: false,
  page: 1,
  haseMore: true,
  loading: false,

  search: '',
};

export const friendsSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setAllFriends: (state, { payload }: PayloadAction<IUser[]>) => {
      state.friends = payload;
      state.loading = true;
      state.haseMore = true;
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
      if (payload.length === 0) state.haseMore = false;
      if (payload.length !== 0 && state.page !== 1) state.friends = [...state.friends, ...payload];
      if (state.page === 1) state.friends = payload;

      state.loading = false;
    });
    builder.addCase(getFriends.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFriends.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { setAllFriends, addPage, setSearch, addFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
