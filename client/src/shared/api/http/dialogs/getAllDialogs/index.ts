import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIDialog, IDialog, IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

import { createDialogConvertation } from './getAllDialogs.convertation';
import { IGetAllDialogs } from './getAllDialogs.type';

export const getAllDialogs = createAsyncThunk<IDialog[], IGetAllDialogs, IConfigAsyncThunk>(
  'Dialogs/getAll',
  ({ search, page }, { rejectWithValue }) => {
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
