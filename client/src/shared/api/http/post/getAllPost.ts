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
}

const getAllPost = createAsyncThunk<IPostState[], IGetAllPost, IConfigAsyncThunk>(
  'posts/getAll',
  ({ page }, { rejectWithValue }) => {
    return API<ApiPostState[]>({
      url: `api/posts`,
      method: 'GET',
      params: { page: page },
    })
      .then(({ data }) => {
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
