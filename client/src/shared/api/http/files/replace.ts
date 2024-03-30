import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilesPost } from 'shared/models/IPost';
import { IConfigAsyncThunk, IError } from 'shared/models/errors';
import API from 'shared/api/interceptors';
import { AxiosError } from 'axios';
import { showMessage } from 'entities/notification/notification.slice';

interface IReplace {
  file: any;
  idPhoto: string;
  status: number;
}

const replace = createAsyncThunk<IFilesPost, IReplace, IConfigAsyncThunk>(
  'files/replace',
  ({ file, idPhoto, status }, { dispatch, rejectWithValue }) => {
    return API<IFilesPost>({
      url: 'api/files/replace',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: { file: file, idPhoto: idPhoto, status: status },
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

export default replace;
