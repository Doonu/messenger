import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from '@entities/post';
import { IConfigAsyncThunk, IError } from '@shared/models';
import { API } from '@shared/api';
import { AxiosError } from 'axios';

import { IGetAllPost } from './getAllPost.type';

export const getAllPost = createAsyncThunk<IPostState[], IGetAllPost, IConfigAsyncThunk>(
  'posts/getAll',
  async ({ page, userId }, { rejectWithValue }) => {
    return API<ApiPostState[]>({
      url: `api/posts`,
      method: 'GET',
      params: { page, userId },
    })
      .then(({ data }) => {
        return data.map((post) => {
          return {
            ...post,
            author: {
              name: post.author.name,
              imgSubstitute: post.author.imgSubstitute,
              id: post.author.id,
              statusConnected: post.author.statusConnected,
              timeConnected: post.author.timeConnected,
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
