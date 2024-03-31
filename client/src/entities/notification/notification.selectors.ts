import { RootState } from 'app/store';

export const notificationSelectors = (state: RootState) => state.notificationSlice.notifications;
export const notificationPageSelectors = (state: RootState) => state.notificationSlice.page;
export const notificationLoadingSelectors = (state: RootState) => state.notificationSlice.loading;
export const notificationErrorSelectors = (state: RootState) => state.notificationSlice.error;
export const notificationLimitSelectors = (state: RootState) => state.notificationSlice.limit;
export const notificationHaseMoreSelectors = (state: RootState) => state.notificationSlice.haseMore;
export const notificationCountSelectors = (state: RootState) => state.notificationSlice.count;

export const messagesSelectors = (state: RootState) => state.notificationSlice.message;
