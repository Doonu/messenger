import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from '../../../entities/post/model/IPost';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk, IError } from '../../models/errors';
import { RootState } from '../../../app/store';
import API from '../interceptors';
import { AxiosError } from 'axios';
import { showMessage } from '../../../entities/notification/notification.slice';

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

const getAllPost = createAsyncThunk<IPostState[], undefined, IConfigAsyncThunk>(
  'posts/getAll',
  (_, { rejectWithValue, dispatch }) => {
    return API<ApiPostState[]>({
      url: `api/posts`,
      method: 'GET',
    })
      .then(({ data }) => {
        return data.map((post) => {
          return {
            ...post,
            author: {
              name: post.author.name,
              imgSubstitute: post.author.imgSubstitute,
            },
            comments: post.comments.length,
          };
        });
      })
      .catch(({ response }: AxiosError<IError>) => {
        dispatch(
          showMessage({
            title: `Неудалось получить посты`,
            type: 'warning',
            level: 'medium',
          })
        );
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllPost;
