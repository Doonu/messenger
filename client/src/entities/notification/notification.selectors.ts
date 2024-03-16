import { RootState } from '../../app/store';

export const notificationSelectors = (state: RootState) => state.notificationSlice.notifications;
export const messagesSelectors = (state: RootState) => state.notificationSlice.message;
