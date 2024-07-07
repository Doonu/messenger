import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

interface IClearTrash {
  status: number;
}

export const clearTrash = createAsyncThunk<null, IClearTrash, IConfigAsyncThunk>(
  'Files/clearTrash',
  ({ status }) => {
    return API({
      url: `api/files/clearTrash`,
      method: 'POST',
      data: { status },
    });
  }
);
