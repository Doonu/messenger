import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfile } from 'shared/api';
import { IUser } from 'shared/models/IUser';

export interface profileState {
  user: IUser;
  isLoading: boolean;
}

const initialState: profileState = {
  user: {} as IUser,
  isLoading: false,
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
      state.isLoading = false;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default profileSlice.reducer;
export const { updateStatus } = profileSlice.actions;
