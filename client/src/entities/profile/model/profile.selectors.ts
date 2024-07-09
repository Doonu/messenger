import { RootState } from '@app/store';

export const selectorProfile = (state: RootState) => state.ls.profile.user;
export const selectorProfileLoader = (state: RootState) => state.ls.profile.isLoading;
