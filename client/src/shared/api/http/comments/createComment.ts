import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { ICommentsState } from 'entities/post/model/IPost';

interface ICreateComment {
  content: string[];
  postId: number;
}

const createComment = createAsyncThunk<ICommentsState, ICreateComment, IConfigAsyncThunk>(
  'comments/createComment',
  ({ content, postId }, { rejectWithValue }) => {
    return API<ICommentsState>({
      url: `api/posts/comments`,
      method: 'POST',
      data: { content, postId },
    })
      .then(({ data }) => {
        return {
          ...data,
          isEdit: false,
        };
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default createComment;
