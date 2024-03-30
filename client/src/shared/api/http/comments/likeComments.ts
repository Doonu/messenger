import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILikeComments } from 'shared/models/IPost';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';

const likeComments = createAsyncThunk<ILikeComments, number, IConfigAsyncThunk>(
  'comments/like',
  (commentId, _) => {
    return API<ILikeComments>({
      url: `api/posts/comments/like`,
      method: 'PATCH',
      data: { commentId: commentId },
    }).then(({ data }) => data);
  }
);

export default likeComments;
