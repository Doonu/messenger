import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentsState } from 'entities/post/model/IPost';
import API from 'shared/api/interceptors';
import { IConfigAsyncThunk } from 'shared/models/errors';

interface IGetAllCommentsInPost {
  postId: number;
  orderBy: string;
  orderDirection: number;
  page: number;
  limit: number;
}

const getAllCommentsInPost = createAsyncThunk<
  ICommentsState[],
  IGetAllCommentsInPost,
  IConfigAsyncThunk
>('comments/getAll', ({ postId, orderDirection, orderBy, page, limit }, { rejectWithValue }) => {
  return API<ICommentsState[]>({
    url: `api/posts/comments/${postId}`,
    method: 'GET',
    params: { orderBy, orderDirection, page, limit },
  })
    .then(({ data }) => {
      return data.map((comment) => {
        return {
          ...comment,
          isEdit: false,
        };
      });
    })
    .catch(({ response }) => {
      return rejectWithValue(response?.data);
    });
});

export default getAllCommentsInPost;
