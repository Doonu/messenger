import { createSlice } from '@reduxjs/toolkit';
import { IDialog } from 'shared/models/IDialog';
import { getAllDialogs } from 'shared/api';

interface dialogsState {
  list: IDialog[];
  page: number;
  error: boolean;
  haseMore: boolean;
  loading: boolean;
}

const initialState: dialogsState = {
  list: [],
  error: false,
  page: 1,
  haseMore: true,
  loading: false,
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
      if (payload.length === 0) state.haseMore = false;
      if (payload.length !== 0 && state.page !== 1) state.list = [...state.list, ...payload];
      if (state.page === 1) state.list = payload;
      state.loading = false;
    });
    builder.addCase(getAllDialogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDialogs.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { addPage } = dialogsSlice.actions;
export default dialogsSlice.reducer;
