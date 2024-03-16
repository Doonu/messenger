import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification, INotifyItem } from './model/INotification';
import getAllNotification from '../../shared/api/http/notification/getAllNotification';

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
  },
});
export const { showMessage, clearMessage, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
