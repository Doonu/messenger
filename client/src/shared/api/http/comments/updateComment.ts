import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentsState } from 'entities/post/model/IPost';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';

interface IUpdateComment {
  content: string[];
  commentId: number;
}

const updateComment = createAsyncThunk<ICommentsState, IUpdateComment, IConfigAsyncThunk>(
  'comments/updateComment',
  ({ content, commentId }, { rejectWithValue }) => {
    return API<ICommentsState>({
      url: `api/posts/comments`,
      method: 'PUT',
      data: { commentId, content },
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

export default updateComment;
