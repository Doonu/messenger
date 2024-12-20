import { createSlice } from '@reduxjs/toolkit';
import { postLogin, postRegistration } from '@entities/auth';

import { IAuthState } from './auth.types';

const initialState: IAuthState = {
  accessToken: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: IAuthState) => {
      state.accessToken = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state: IAuthState, { payload }) => {
      state.accessToken = payload.accessToken;
    });
    builder.addCase(postRegistration.fulfilled, (state: IAuthState, { payload }) => {
      state.accessToken = payload.accessToken;
    });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
