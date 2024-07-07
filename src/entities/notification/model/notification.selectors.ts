import { RootState } from '@app/store';

export const notificationSelectors = (state: RootState) => state.notification.notifications;
export const notificationPageSelectors = (state: RootState) => state.notification.page;
export const notificationLoadingSelectors = (state: RootState) => state.notification.isLoading;
export const notificationErrorSelectors = (state: RootState) => state.notification.isError;
export const notificationLimitSelectors = (state: RootState) => state.notification.limit;
export const notificationHaseMoreSelectors = (state: RootState) => state.notification.isHaseMore;
export const notificationCountSelectors = (state: RootState) => state.notification.count;

export const messagesSelectors = (state: RootState) => state.notification.message;
