import { RootState } from '@app/store';

export const selectorDialogs = (state: RootState) => state.dialogs.list;
export const selectorLoading = (state: RootState) => state.dialogs.isLoading;
export const selectorPage = (state: RootState) => state.dialogs.page;
export const selectorDialogsHaseMore = (state: RootState) => state.dialogs.isHaseMore;
export const selectorError = (state: RootState) => state.dialogs.isError;
export const selectorDialogsSearch = (state: RootState) => state.dialogs.search;
