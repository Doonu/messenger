import { RootState } from 'app/store';

export const selectorProfile = (state: RootState) => state.userSlice.user;
export const selectorProfileLoader = (state: RootState) => state.userSlice.isLoading;
