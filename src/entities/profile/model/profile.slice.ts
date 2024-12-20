import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProfile } from '@entities/profile';
import { IUser } from '@entities/friends';

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
      const date = new Date();
      state.user.timeConnected = date.toISOString();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProfile.fulfilled,
      (state: ProfileState, { payload }: PayloadAction<IUser>) => {
        state.user = payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getProfile.pending, (state: ProfileState) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.rejected, (state: ProfileState) => {
      state.isLoading = false;
    });
  },
});

export default ProfileSlice.reducer;
export const { updateStatus } = ProfileSlice.actions;
