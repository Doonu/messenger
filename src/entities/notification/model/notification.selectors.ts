import { RootState } from '@app/store';

export const notificationSelectors = (state: RootState) => state.ls.notification.notifications;
export const notificationPageSelectors = (state: RootState) => state.ls.notification.page;
export const notificationLoadingSelectors = (state: RootState) => state.ls.notification.isLoading;
export const notificationErrorSelectors = (state: RootState) => state.ls.notification.isError;
export const notificationLimitSelectors = (state: RootState) => state.ls.notification.limit;
export const notificationHaseMoreSelectors = (state: RootState) => state.ls.notification.isHaseMore;
export const notificationCountSelectors = (state: RootState) => state.ls.notification.count;

export const messagesSelectors = (state: RootState) => state.ls.notification.message;
