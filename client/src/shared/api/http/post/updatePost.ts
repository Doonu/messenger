import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from 'entities/post/model/IPost';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';

type IPostUpdate = Pick<IPostState, 'content' | 'files' | 'isDisabledComments' | 'view' | 'id'> & {
  status: number;
};

const updatePost = createAsyncThunk<IPostState, IPostUpdate, IConfigAsyncThunk>(
  'post/update',
  ({ content, isDisabledComments, view, files, id, status }, { rejectWithValue }) => {
    let dynamicParams = {};

    if (files.length) {
      dynamicParams = { ...updatePost, files: files };
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

export default updatePost;
