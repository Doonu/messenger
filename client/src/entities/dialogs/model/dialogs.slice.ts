import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDialog, IMessage } from '@shared/models';
import { getAllDialogs } from '@shared/api';

interface DialogsState {
  list: IDialog[];
  page: number;
  isError: boolean;
  isHaseMore: boolean;
  isLoading: boolean;
  search: string;
}

const initialState: DialogsState = {
  list: [],
  isError: false,
  page: 1,
  isHaseMore: true,
  isLoading: false,
  search: '',
};

const DialogsSlice = createSlice({
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
    builder.addCase(getAllDialogs.fulfilled, (state: DialogsState, { payload }) => {
      if (payload.length === 0) state.isHaseMore = false;
      if (state.page === 1) state.list = payload;
      if (state.page > 1 && payload.length !== 0) state.list = [...state.list, ...payload];

      state.isLoading = false;
    });
    builder.addCase(getAllDialogs.pending, (state: DialogsState) => {
      state.isLoading = true;
    });
    builder.addCase(getAllDialogs.rejected, (state: DialogsState) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { addPage, setDialogs, setSearch, addNewMessage } = DialogsSlice.actions;
export default DialogsSlice.reducer;
