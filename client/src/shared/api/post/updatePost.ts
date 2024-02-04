import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPostState, IPostState } from '../../../entities/post/model/IPost';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk } from '../../models/errors';
import { RootState } from '../../../app/store';
import API from '../interceptors';

type IPostUpdate = Pick<IPostState, 'content' | 'files' | 'isDisabledComments' | 'view' | 'id'>;

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

const updatePost = createAsyncThunk<IPostState, IPostUpdate, IConfigAsyncThunk>(
  'post/update',
  ({ content, isDisabledComments, view, files, id }, { rejectWithValue }) => {
    let dynamicParams = {};

    if (files.length) {
      dynamicParams = { ...updatePost, files: files };
    }

    return API<ApiPostState>({
      url: `api/posts`,
      method: 'PUT',
      data: { ...dynamicParams, content, isDisabledComments, view, id },
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
          },
        };
      })
      .catch((response) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default updatePost;
