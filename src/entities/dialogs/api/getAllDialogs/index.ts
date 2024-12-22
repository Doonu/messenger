import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { APIDialog, IDialog } from '@entities/dialogs';

import { createDialogConvertation } from './getAllDialogs.convertation';
import { IGetAllDialogs } from './getAllDialogs.types';

export const getAllDialogs = createAsyncThunk<IDialog[], IGetAllDialogs, IConfigAsyncThunk>(
  'dialogs/getAll',
  async ({ search, page }, { rejectWithValue }) => {
    return API<APIDialog[]>({
      url: `api/dialogs`,
      method: 'GET',
      params: { page, search },
    })
      .then(({ data }) => {
        // const isValid = ValidationSchema.isValidSync(data);
        //
        // if (!isValid) {
        //   console.warn(ValidationSchema.validateSync(data));
        // }

        return createDialogConvertation(data);
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);
