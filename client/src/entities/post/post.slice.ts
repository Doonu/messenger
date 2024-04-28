import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostState, IRecalculationOfComments } from './model/IPost';
import { ILikePost, IToggleCommentsById } from 'shared/models/IPost';
import likePost from 'shared/api/http/post/likePost';
import {
  updatePost,
  postCreate,
  getAllPost,
  deletePostById,
  restorePostById,
  toggleCommentsById,
} from 'shared/api';

interface postsState {
  posts: IPostState[];
  isError: boolean;
  isLoading: boolean;
  pagePost: number;
  isHaseMore: boolean;

  deletedPost: IPostState[];
  editedPost: IPostState | undefined;
  isWarningEdit: boolean;
}

const initialState: postsState = {
  posts: [],
  isError: false,
  isLoading: true,
  pagePost: 1,
  isHaseMore: true,

  deletedPost: [],
  editedPost: undefined,
  isWarningEdit: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    deletePost: (state, { payload }: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    setAllPosts: (state, { payload }: PayloadAction<IPostState[]>) => {
      state.posts = payload;
      state.isLoading = true;
      state.isHaseMore = true;
      state.pagePost = 1;
    },
    editPost: (state, { payload }: PayloadAction<number>) => {
      if (!state.editedPost) {
        state.editedPost = state.posts.find((post) => post.id === payload);
      } else {
        state.isWarningEdit = true;
      }
    },
    addPage: (state) => {
      state.pagePost += 1;
    },
    switchWarningPost: (state, { payload }: PayloadAction<boolean>) => {
      state.isWarningEdit = payload;
    },
    removeEditPost: (state) => {
      state.editedPost = undefined;
    },
    recalculationOfComments: (state, { payload }: PayloadAction<IRecalculationOfComments>) => {
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
    builder.addCase(getAllPost.fulfilled, (state, { payload }) => {
      if (payload.length === 0) state.isHaseMore = false;

      if (payload.length !== 0) state.posts = [...state.posts, ...payload];

      state.isLoading = false;
    });
    builder.addCase(getAllPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPost.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(postCreate.fulfilled, (state, { payload }) => {
      state.posts.unshift(payload);
    });
    builder.addCase(updatePost.fulfilled, (state, { payload }) => {
      const index = state.posts.findIndex((i) => i.id === payload.id);
      state.posts[index] = payload;
    });
    builder.addCase(deletePostById.fulfilled, (state, { payload }) => {
      state.deletedPost = [...state.deletedPost, payload];
    });
    builder.addCase(restorePostById.fulfilled, (state, { payload }) => {
      state.deletedPost = state.deletedPost.filter((post) => post.id !== payload.id);
    });
    builder.addCase(likePost.fulfilled, (state, { payload }: PayloadAction<ILikePost>) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload.postId) {
          if (payload.isLike) {
            return {
              ...post,
              countLikes: post.countLikes + 1,
            };
          } else {
            return {
              ...post,
              countLikes: post.countLikes - 1,
            };
          }
        }
        return post;
      });
    });
    builder.addCase(
      toggleCommentsById.fulfilled,
      (state, { payload }: PayloadAction<IToggleCommentsById>) => {
        state.posts = state.posts.map((post) => {
          if (post.id == payload.postId) {
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
} = postSlice.actions;
export default postSlice.reducer;
