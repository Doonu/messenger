import { createSlice } from '@reduxjs/toolkit';
import { postLogin, postRegistration } from '@shared/api';

interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.accessToken = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state: AuthState, { payload }) => {
      state.accessToken = payload.token;
    });
    builder.addCase(postRegistration.fulfilled, (state: AuthState, { payload }) => {
      state.accessToken = payload.token;
    });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
