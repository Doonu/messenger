import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllNotification,
  getAllNotificationCount,
  deleteNotification,
  deleteAllNotifications,
} from '@entities/notification';

import { INotification, INotifyItem } from './notification.types';

const initialState: INotification = {
  message: {
    title: '',
    type: undefined,
    level: undefined,
  },
  count: 0,
  notifications: [],
  isLoading: false,
  isError: false,
  page: 1,
  limit: 5,
  isHaseMore: true,
};

const NotificationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showMessage: (state: INotification, { payload }: PayloadAction<INotification['message']>) => {
      state.message = payload;
    },
    clearMessage: (state: INotification) => {
      state.message = { type: undefined, level: undefined, title: '' };
    },
    addNotification: (state: INotification, action: PayloadAction<INotifyItem>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    addCount: (state: INotification) => {
      state.count += 1;
    },
    addPage: (state: INotification) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotification.fulfilled, (state: INotification, { payload }) => {
      if (payload.length !== 0) state.notifications = [...state.notifications, ...payload];
      if (payload.length === 0) state.isHaseMore = false;
      if (payload.length !== state.limit) state.isHaseMore = false;

      state.isLoading = false;
    });
    builder.addCase(getAllNotificationCount.fulfilled, (state: INotification, { payload }) => {
      state.count = payload;
    });
    builder.addCase(getAllNotification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotification.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteNotification.fulfilled, (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload
      );
      state.count -= 1;
    });
    builder.addCase(deleteAllNotifications.fulfilled, (state) => {
      state.notifications = [];
      state.count = 0;
    });
  },
});
export const { showMessage, clearMessage, addNotification, addPage, addCount } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
