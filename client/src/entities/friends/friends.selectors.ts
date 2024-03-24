import { RootState } from '../../app/store';

export const selectorFriends = (state: RootState) => state.friendsSlice.friends;
export const selectorLoadingFriends = (state: RootState) => state.friendsSlice.loading;
export const selectorErrorFriends = (state: RootState) => state.friendsSlice.error;
export const selectorPageFriends = (state: RootState) => state.friendsSlice.page;
export const selectorHaseMore = (state: RootState) => state.friendsSlice.haseMore;
export const selectorSearch = (state: RootState) => state.friendsSlice.search;
