import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from 'shared/api/interceptors';

interface IClearTrash {
  status: number;
}

const clearTrash = createAsyncThunk<null, IClearTrash, IConfigAsyncThunk>(
  'files/clearTrash',
  ({ status }, {}) => {
    return API({
      url: `api/files/clearTrash`,
      method: 'POST',
      data: { status: status },
    });
  }
);

export default clearTrash;
