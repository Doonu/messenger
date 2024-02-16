import { RootState } from '../../app/store';

export const selectorWarningEdit = (state: RootState) => state.postSlice.warningEdit;
export const selectorDeletedPost = (state: RootState) => state.postSlice.deletedPost;
export const selectorEditedPost = (state: RootState) => state.postSlice.editedPost;

export const selectorPost = (state: RootState) => state.postSlice.posts;
export const selectorLoadingPosts = (state: RootState) => state.postSlice.loadingPosts;
export const selectorErrorPosts = (state: RootState) => state.postSlice.errorPosts;
export const selectorPagePost = (state: RootState) => state.postSlice.pagePost;
export const selectorHaseMore = (state: RootState) => state.postSlice.haseMore;
