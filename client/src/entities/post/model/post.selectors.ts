import { RootState } from '@app/store';

export const selectorWarningEdit = (state: RootState) => state.post.isWarningEdit;
export const selectorDeletedPost = (state: RootState) => state.post.deletedPost;
export const selectorEditedPost = (state: RootState) => state.post.editedPost;
export const selectorPost = (state: RootState) => state.post.posts;
export const selectorLoadingPosts = (state: RootState) => state.post.isLoading;
export const selectorErrorPosts = (state: RootState) => state.post.isError;
export const selectorPagePost = (state: RootState) => state.post.pagePost;
export const selectorPostHaseMore = (state: RootState) => state.post.isHaseMore;
