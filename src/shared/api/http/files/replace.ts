import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilesPost, IConfigAsyncThunk, IError } from '@shared/models';
import { API } from '@shared/api';
import { AxiosError } from 'axios';
import { showMessage } from '@entities/notification';

interface IReplace {
  file: any;
  idPhoto: string;
  status: number;
}

export const replace = createAsyncThunk<IFilesPost, IReplace, IConfigAsyncThunk>(
  'Files/replace',
  ({ file, idPhoto, status }, { dispatch, rejectWithValue }) => {
    return API<IFilesPost>({
      url: 'api/files/replace',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: { file, idPhoto, status },
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
