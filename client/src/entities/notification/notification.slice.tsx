import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification, INotifyItem } from 'shared/models/INotification';
import {
  deleteAllNotifications,
  getAllNotification,
  deleteNotification,
  getAllNotificationCount,
} from 'shared/api';

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

export const notificationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<INotification['message']>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = { type: undefined, level: undefined, title: '' };
    },
    addNotification: (state, action: PayloadAction<INotifyItem>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    addCount: (state) => {
      state.count += 1;
    },
    addPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotification.fulfilled, (state, { payload }) => {
      if (payload.length !== 0) state.notifications = [...state.notifications, ...payload];
      if (payload.length === 0) state.isHaseMore = false;
      if (payload.length !== state.limit) state.isHaseMore = false;

      state.isLoading = false;
    });
    builder.addCase(getAllNotificationCount.fulfilled, (state, { payload }) => {
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
      state.count = state.count - 1;
    });
    builder.addCase(deleteAllNotifications.fulfilled, (state) => {
      state.notifications = [];
      state.count = 0;
    });
  },
});
export const {
  showMessage,
  clearMessage,
  addNotification,
  addPage,
  addCount,
} = notificationSlice.actions;
export default notificationSlice.reducer;
