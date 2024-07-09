import { RootState } from '@app/store';

export const selectorWarningEdit = (state: RootState) => state.ls.post.isWarningEdit;
export const selectorDeletedPost = (state: RootState) => state.ls.post.deletedPost;
export const selectorEditedPost = (state: RootState) => state.ls.post.editedPost;
export const selectorPost = (state: RootState) => state.ls.post.posts;
export const selectorLoadingPosts = (state: RootState) => state.ls.post.isLoading;
export const selectorErrorPosts = (state: RootState) => state.ls.post.isError;
export const selectorPagePost = (state: RootState) => state.ls.post.pagePost;
export const selectorPostHaseMore = (state: RootState) => state.ls.post.isHaseMore;
