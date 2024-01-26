import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk } from '../../models/errors';
import { RootState } from '../../../app/store';
import API from '../interceptors';

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

const clearTrash = createAsyncThunk<null, undefined, IConfigAsyncThunk>(
  'files/clearTrash',
  (_, {}) => {
    return API({
      url: `http://localhost:5000/api/files/clearTrash`,
      method: 'POST',
    });
  }
);

export default clearTrash;
