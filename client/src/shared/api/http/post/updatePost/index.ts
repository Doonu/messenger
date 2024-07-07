import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from '@entities/post';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

import { IPostUpdate } from './updatePost.type';

export const updatePost = createAsyncThunk<IPostState, IPostUpdate, IConfigAsyncThunk>(
  'Index/update',
  ({ content, isDisabledComments, view, files, id, status }, { rejectWithValue }) => {
    let dynamicParams = {};

    if (files.length) {
      dynamicParams = { ...updatePost, files };
    }

    return API<ApiPostState>({
      url: `api/posts`,
      method: 'PUT',
      data: { ...dynamicParams, content, isDisabledComments, view, id, status },
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
