import { createSlice } from '@reduxjs/toolkit';
import { IDialog } from 'shared/models/IDialog';
import { getAllDialogs } from 'shared/api';

interface dialogsState {
  list: IDialog[];
  page: number;
  isError: boolean;
  isHaseMore: boolean;
  isLoading: boolean;
}

const initialState: dialogsState = {
  list: [],
  isError: false,
  page: 1,
  isHaseMore: true,
  isLoading: false,
};

export const dialogsSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDialogs.fulfilled, (state, { payload }) => {
      if (payload.length === 0) state.isHaseMore = false;
      if (payload.length !== 0 && state.page !== 1) state.list = [...state.list, ...payload];
      if (state.page === 1) state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllDialogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllDialogs.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { addPage } = dialogsSlice.actions;
export default dialogsSlice.reducer;
