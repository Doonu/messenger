import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'shared/api/interceptors';
import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import { IFilesPost } from 'shared/models/IPost';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';

interface IAddWaitList {
  files: any[];
  status: number;
}

const addPendingList = createAsyncThunk<IFilesPost[], IAddWaitList, IConfigAsyncThunk>(
  'files/pending',
  (files, { rejectWithValue, dispatch }) => {
    return API<IFilesPost[]>({
      url: `api/files/pending`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: files,
    })
      .then(({ data }) => data)
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
