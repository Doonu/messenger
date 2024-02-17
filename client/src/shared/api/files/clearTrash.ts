import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk as IDefaultConfigAsyncThunk } from '../../models/errors';
import { RootState } from '../../../app/store';
import API from '../interceptors';

interface IConfigAsyncThunk extends IDefaultConfigAsyncThunk {
  state: RootState;
}

interface IClearTrash {
  status: number;
}

const clearTrash = createAsyncThunk<null, IClearTrash, IConfigAsyncThunk>(
  'files/clearTrash',
  ({ status }, {}) => {
    console.log(status);
    return API({
      url: `api/files/clearTrash`,
      method: 'POST',
      data: { status: status },
    });
  }
);

export default clearTrash;
