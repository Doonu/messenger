import { RootState } from '@app/store';

export const selectorDialogs = (state: RootState) => state.ls.dialogs.list;
export const selectorLoading = (state: RootState) => state.ls.dialogs.isLoading;
export const selectorPage = (state: RootState) => state.ls.dialogs.page;
export const selectorDialogsHaseMore = (state: RootState) => state.ls.dialogs.isHaseMore;
export const selectorError = (state: RootState) => state.ls.dialogs.isError;
export const selectorDialogsSearch = (state: RootState) => state.ls.dialogs.search;
