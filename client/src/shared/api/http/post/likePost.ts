import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { ILikePost } from 'shared/models/IPost';

const likePost = createAsyncThunk<ILikePost, number, IConfigAsyncThunk>(
  'post/like',
  (postId, _) => {
    return API<ILikePost>({
      url: `api/posts/like`,
      method: 'PATCH',
      data: { postId: postId },
    }).then(({ data }) => {
      return data;
    });
  }
);

export default likePost;
