import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfile } from '@shared/api';
import { IUser } from '@shared/models';

export interface ProfileState {
  user: IUser;
  isLoading: boolean;
}

const initialState: ProfileState = {
  user: {} as IUser,
  isLoading: false,
};

const ProfileSlice = createSlice({
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

export default ProfileSlice.reducer;
export const { updateStatus } = ProfileSlice.actions;
