import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../interceptors';

import { IConfigAsyncThunk as IDefaultConfigAsyncThunk, IError } from '../../models/errors';
import { RootState } from '../../../app/store';
import { AxiosError } from 'axios';
import { showMessage } from '../../../entities/notification/notification.slice';
import { IPostState, ApiPostState } from '../../../entities/post/model/IPost';

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

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
