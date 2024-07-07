import { RootState } from '@app/store';

export const selectorFriends = (state: RootState) => state.friends.friends;
export const selectorLoadingFriends = (state: RootState) => state.friends.isLoading;
export const selectorErrorFriends = (state: RootState) => state.friends.isError;
export const selectorPageFriends = (state: RootState) => state.friends.page;
export const selectorFriendsHaseMore = (state: RootState) => state.friends.isHaseMore;
export const selectorFriendsSearch = (state: RootState) => state.friends.search;
