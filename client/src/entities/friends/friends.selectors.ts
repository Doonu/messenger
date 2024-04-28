import { RootState } from 'app/store';

export const selectorFriends = (state: RootState) => state.friendsSlice.friends;
export const selectorLoadingFriends = (state: RootState) => state.friendsSlice.isLoading;
export const selectorErrorFriends = (state: RootState) => state.friendsSlice.isError;
export const selectorPageFriends = (state: RootState) => state.friendsSlice.page;
export const selectorHaseMore = (state: RootState) => state.friendsSlice.isHaseMore;
export const selectorSearch = (state: RootState) => state.friendsSlice.search;
