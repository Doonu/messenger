import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@shared/api';
import { IConfigAsyncThunk, IError, IFilesPost } from '@shared/models';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

interface IAddWaitList {
  files: any[];
  status: number;
}

export const addPendingList = createAsyncThunk<IFilesPost[], IAddWaitList, IConfigAsyncThunk>(
  'Files/pending',
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
