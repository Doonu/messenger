import { RootState } from '../../app/store';

export const selectorDialogs = (state: RootState) => state.dialogsSlice.list;
export const selectorLoading = (state: RootState) => state.dialogsSlice.isLoading;
export const selectorPage = (state: RootState) => state.dialogsSlice.page;
export const selectorHaseMore = (state: RootState) => state.dialogsSlice.isHaseMore;
export const selectorError = (state: RootState) => state.dialogsSlice.isError;
export const selectorSearch = (state: RootState) => state.dialogsSlice.search;
