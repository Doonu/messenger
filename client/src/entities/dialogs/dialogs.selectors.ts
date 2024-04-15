import { RootState } from '../../app/store';

export const selectorDialogs = (state: RootState) => state.dialogsSlice.list;
export const selectorLoading = (state: RootState) => state.dialogsSlice.loading;
export const selectorPage = (state: RootState) => state.dialogsSlice.page;
export const selectorHaseMore = (state: RootState) => state.dialogsSlice.haseMore;
export const selectorError = (state: RootState) => state.dialogsSlice.error;
