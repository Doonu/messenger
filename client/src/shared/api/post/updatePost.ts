import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPostState } from '../../../entities/post/model/IPost';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk } from '../../models/errors';
import { RootState } from '../../../app/store';
import API from '../interceptors';

type IPostUpdate = Pick<IPostState, 'content' | 'files' | 'isDisabledComments' | 'view' | 'id'>;

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

const updatePost = createAsyncThunk<IPostState, IPostUpdate, IConfigAsyncThunk>(
  'post/update',
  ({ content, isDisabledComments, view, files, id }, {}) => {
    let dynamicParams = {};

    if (files.length) {
      dynamicParams = { ...updatePost, files: files };
    }

    return API<IPostState>({
      url: `http://localhost:5000/api/posts`,
      method: 'PUT',
      data: { ...dynamicParams, content, isDisabledComments, view, id },
    }).then(({ data }) => {
      return {
        id: data.id,
        userId: data.userId,
        content: data.content,
        countLikes: data.countLikes,
        likesList: data.likesList,
        shared: data.shared,
        comments: data.comments,
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
    });
  }
);

export default updatePost;
