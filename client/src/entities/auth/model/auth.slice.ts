import { createSlice } from '@reduxjs/toolkit';
import { postLogin } from '@shared/api';

interface AuthState {
  accessToken: string;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  isAuth: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state: AuthState) => {
      const session = localStorage.getItem('session');
      if (session) state.isAuth = !!JSON.parse(session).at;
      else state.isAuth = false;
    },
    logout: (state: AuthState) => {
      localStorage.setItem('session', '');
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state: AuthState, { payload }) => {
      state.accessToken = payload.token;
      state.isAuth = true;
    });
  },
});
export const { checkAuth, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
