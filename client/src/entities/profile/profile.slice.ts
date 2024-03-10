import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getProfile from '../../shared/api/http/user/getProfile';
import { IUser } from '../../shared/models/IUser';

export interface profileState {
  user: IUser;
  loader: boolean;
}

const initialState: profileState = {
  user: {} as IUser,
  loader: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.user.statusConnected = true;
      state.user.timeConnected = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.loader = false;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.loader = false;
    });
  },
});

export default profileSlice.reducer;
export const { updateStatus } = profileSlice.actions;
