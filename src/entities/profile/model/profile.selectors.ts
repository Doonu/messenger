import { RootState } from '@app/store';

export const selectorProfile = (state: RootState) => state.profile.user;
export const selectorProfileLoader = (state: RootState) => state.profile.isLoading;
