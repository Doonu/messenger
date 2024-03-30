import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification, INotifyItem } from '../../shared/models/INotification';
import { deleteAllNotifications, getAllNotification, deleteNotification } from '../../shared/api';

const initialState: INotification = {
  message: {
    title: '',
    type: undefined,
    level: undefined,
  },
  notifications: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotification.fulfilled, (state, { payload }) => {
      state.notifications = payload;
    });
    builder.addCase(deleteNotification.fulfilled, (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload
      );
    });
    builder.addCase(deleteAllNotifications.fulfilled, (state) => {
      state.notifications = [];
    });
  },
});
export const { showMessage, clearMessage, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
