import { RootState } from '../../app/store';

export const selectorUser = (state: RootState) => state.userSlice.user;
export const selectorUserLoader = (state: RootState) => state.userSlice.loader;
