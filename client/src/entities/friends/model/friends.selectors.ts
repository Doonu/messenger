import { RootState } from '@app/store';

export const selectorFriends = (state: RootState) => state.ls.friends.friends;
export const selectorLoadingFriends = (state: RootState) => state.ls.friends.isLoading;
export const selectorErrorFriends = (state: RootState) => state.ls.friends.isError;
export const selectorPageFriends = (state: RootState) => state.ls.friends.page;
export const selectorFriendsHaseMore = (state: RootState) => state.ls.friends.isHaseMore;
export const selectorFriendsSearch = (state: RootState) => state.ls.friends.search;
