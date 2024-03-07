import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from '../../../../entities/post/model/IPost';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk, IError } from '../../../models/errors';
import { RootState } from '../../../../app/store';
import API from '../../interceptors';
import { AxiosError } from 'axios';

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

interface IGetAllPost {
  page: number;
  userId?: number;
}

const getAllPost = createAsyncThunk<IPostState[], IGetAllPost, IConfigAsyncThunk>(
  'posts/getAll',
  ({ page, userId = -1 }, { rejectWithValue }) => {
    return API<ApiPostState[]>({
      url: `api/posts/${userId}`,
      method: 'GET',
      params: { page: page },
    })
      .then(({ data }) => {
        console.log(data);
        return data.map((post) => {
          return {
            ...post,
            author: {
              name: post.author.name,
              imgSubstitute: post.author.imgSubstitute,
              id: post.author.id,
            },
            comments: post.comments.length,
          };
        });
      })
      .catch(({ response }: AxiosError<IError>) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllPost;
