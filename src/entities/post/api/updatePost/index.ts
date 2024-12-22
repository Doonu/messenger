import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from '@entities/post';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

import { IPostUpdate } from './updatePost.types';

export const updatePost = createAsyncThunk<IPostState, IPostUpdate, IConfigAsyncThunk>(
  'post/update',
  (post, { rejectWithValue }) => {
    const formData = new FormData();

    post.files.forEach((file) => {
      formData.append('images', file.originFileObj as File);
    });

    return API<ApiPostState>({
      url: `api/posts`,
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: { ...formData, ...post },
    })
      .then(({ data }) => {
        return {
          id: data.id,
          userId: data.userId,
          content: data.content,
          countLikes: data.countLikes,
          likesList: data.likesList,
          shared: data.shared,
          comments: data.comments.length,
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
      .catch((response) => {
        return rejectWithValue(response?.data);
      });
  }
);
