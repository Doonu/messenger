import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';

import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';
import { IPostState, ApiPostState } from 'entities/post/model/IPost';

type IPostCreate = Pick<IPostState, 'content' | 'isDisabledComments' | 'view' | 'files'> & {
  status: number;
};

const postCreate = createAsyncThunk<IPostState, IPostCreate, IConfigAsyncThunk>(
  'posts/create',
  (post, { rejectWithValue, dispatch }) => {
    return API<ApiPostState>({
      url: `api/posts`,
      method: 'POST',
      data: post,
    })
      .then(({ data }) => {
        return {
          id: data.id,
          userId: data.userId,
          content: data.content,
          countLikes: data.countLikes,
          likesList: data.likesList,
          shared: data.shared,
          comments: 0,
          files: data.files,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          isDisabledComments: data.isDisabledComments,
          view: data.view,
          author: {
            name: data.author.name,
            imgSubstitute: data.author.imgSubstitute,
            id: data.author.id,
            statusConnected: data.author.statusConnected,
            timeConnected: data.author.timeConnected,
          },
        };
      })
      .catch(({ response }: AxiosError<IError>) => {
        dispatch(
          showMessage({
            title: `Неудалось создать пост`,
            type: 'warning',
            level: 'medium',
          })
        );
        return rejectWithValue(response?.data);
      });
  }
);

export default postCreate;
