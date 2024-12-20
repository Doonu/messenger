import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deletePostById,
  getAllPost,
  likePost,
  postCreate,
  restorePostById,
  toggleCommentsById,
  updatePost,
} from '@entities/post';
import { ILikePost, IToggleCommentsById } from '@entities/dialogs';

import { IPostState, IRecalculationOfComments } from './IPost';

interface PostsState {
  posts: IPostState[];
  isError: boolean;
  isLoading: boolean;
  pagePost: number;
  isHaseMore: boolean;

  deletedPost: IPostState[];
  editedPost: IPostState | undefined;
  isWarningEdit: boolean;
}

const initialState: PostsState = {
  posts: [],
  isError: false,
  isLoading: true,
  pagePost: 1,
  isHaseMore: true,

  deletedPost: [],
  editedPost: undefined,
  isWarningEdit: false,
};

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    deletePost: (state: PostsState, { payload }: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    setAllPosts: (state: PostsState, { payload }: PayloadAction<IPostState[]>) => {
      state.posts = payload;
      state.isLoading = true;
      state.isHaseMore = true;
      state.pagePost = 1;
    },
    editPost: (state: PostsState, { payload }: PayloadAction<number>) => {
      if (!state.editedPost) {
        state.editedPost = state.posts.find((post) => post.id === payload);
      } else {
        state.isWarningEdit = true;
      }
    },
    addPage: (state: PostsState) => {
      state.pagePost += 1;
    },
    switchWarningPost: (state: PostsState, { payload }: PayloadAction<boolean>) => {
      state.isWarningEdit = payload;
    },
    removeEditPost: (state: PostsState) => {
      state.editedPost = undefined;
    },
    recalculationOfComments: (
      state: PostsState,
      { payload }: PayloadAction<IRecalculationOfComments>
    ) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload.id) {
          return {
            ...post,
            comments: payload.action === 0 ? post.comments - 1 : post.comments + 1,
          };
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPost.fulfilled, (state: PostsState, { payload }) => {
      if (payload.length === 0) state.isHaseMore = false;
      if (payload.length !== 0) state.posts = [...state.posts, ...payload];

      state.isLoading = false;
    });
    builder.addCase(getAllPost.pending, (state: PostsState) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPost.rejected, (state: PostsState) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(postCreate.fulfilled, (state: PostsState, { payload }) => {
      state.posts.unshift(payload);
    });
    builder.addCase(updatePost.fulfilled, (state: PostsState, { payload }) => {
      const index = state.posts.findIndex((i) => i.id === payload.id);
      state.posts[index] = payload;
    });
    builder.addCase(deletePostById.fulfilled, (state: PostsState, { payload }) => {
      state.deletedPost = [...state.deletedPost, payload];
    });
    builder.addCase(restorePostById.fulfilled, (state: PostsState, { payload }) => {
      state.deletedPost = state.deletedPost.filter((post) => post.id !== payload.id);
    });
    builder.addCase(
      likePost.fulfilled,
      (state: PostsState, { payload }: PayloadAction<ILikePost>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === payload.postId) {
            if (payload.isLike) {
              return {
                ...post,
                countLikes: post.countLikes + 1,
              };
            }
            return {
              ...post,
              countLikes: post.countLikes - 1,
            };
          }
          return post;
        });
      }
    );
    builder.addCase(
      toggleCommentsById.fulfilled,
      (state: PostsState, { payload }: PayloadAction<IToggleCommentsById>) => {
        state.posts = state.posts.map((post) => {
          if (post.id === payload.postId) {
            return {
              ...post,
              isDisabledComments: !post.isDisabledComments,
            };
          }
          return post;
        });
      }
    );
  },
});

export const {
  addPage,
  deletePost,
  setAllPosts,
  editPost,
  switchWarningPost,
  removeEditPost,
  recalculationOfComments,
} = PostSlice.actions;
export default PostSlice.reducer;
