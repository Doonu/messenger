import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDialog } from 'shared/models/IDialog';
import { getAllDialogs } from 'shared/api';
import { IMessage } from '../../shared/models/IMessage';

interface dialogsState {
  list: IDialog[];
  page: number;
  isError: boolean;
  isHaseMore: boolean;
  isLoading: boolean;
  search: string;
}

const initialState: dialogsState = {
  list: [],
  isError: false,
  page: 1,
  isHaseMore: true,
  isLoading: false,
  search: '',
};

export const dialogsSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addPage: (state) => {
      state.page += 1;
    },
    setDialogs: (state, { payload }: PayloadAction<IDialog[]>) => {
      state.list = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    addNewMessage: (state, { payload }: PayloadAction<IMessage | null>) => {
      const findDialog = state.list.find((el) => el.id === payload?.dialogId);

      if (findDialog && payload) {
        findDialog.lastMessage = payload;
        findDialog.countNotReadMessages += 1;
        findDialog.readStatusLastMessage = false;
        findDialog.updatedAt = payload.updatedAt;

        state.list = [
          ...state.list.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDialogs.fulfilled, (state, { payload }) => {
      if (payload.length === 0) state.isHaseMore = false;
      if (state.page === 1) state.list = payload;
      if (state.page > 1 && payload.length !== 0) state.list = [...state.list, ...payload];

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

export const { addPage, setDialogs, setSearch, addNewMessage } = dialogsSlice.actions;
export default dialogsSlice.reducer;
