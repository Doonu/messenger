import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../interceptors';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk, IError } from '../../models/errors';
import { RootState } from '../../../app/store';
import { IFilesPost } from '../../models/IPost';
import { AxiosError } from 'axios';
import { showMessage } from '../../../entities/notification/notification.slice';

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

type IAddWaitList = any[];

const addPendingList = createAsyncThunk<IFilesPost[], IAddWaitList, IConfigAsyncThunk>(
  'files/pending',
  (files, { rejectWithValue, dispatch }) => {
    return API<IFilesPost[]>({
      url: `http://localhost:5000/api/files/pending`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: files,
    })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }: AxiosError<IError>) => {
        dispatch(
          showMessage({
            title: `Неудалось добавить файлы`,
            type: 'warning',
            level: 'medium',
          })
        );
        return rejectWithValue(response?.data);
      });
  }
);

export default addPendingList;
