import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getProfile from '../../shared/api/user/getProfile';
import { IUser } from '../../shared/models/IUser';

export interface authState {
  user: IUser;
  loader: boolean;
}

const initialState: authState = {
  user: {} as IUser,
  loader: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    });
  },
});

export default userSlice.reducer;
