import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { APIDialogChat, IDialogChat } from '@entities/dialogs';

import { getDialogByIdConvertation } from './getDialogById.convertation';

export const getDialogById = createAsyncThunk<IDialogChat, number, IConfigAsyncThunk>(
  'dialog/getById',
  async (id, { rejectWithValue }) => {
    return API<APIDialogChat>({
      url: `api/dialogs/${id}`,
      method: 'GET',
    })
      .then(({ data }) => {
        // const isValid = ValidationSchema.isValidSync(data);

        // if (!isValid) {
        //   console.warn(ValidationSchema.validateSync(data));
        // }
        return getDialogByIdConvertation(data);
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);
