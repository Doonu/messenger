import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';
import { APIDialog, IDialog } from '@entities/dialogs';

import { createDialogConvertation } from './createDialog.convertation';
import { ICreateDialog } from './createDialog.types';

export const createDialog = createAsyncThunk<IDialog, ICreateDialog, IConfigAsyncThunk>(
  'dialogs/createDialog',
  async ({ participantIds, nameChat }, { rejectWithValue }) => {
    return API<APIDialog>({
      url: `api/dialogs`,
      method: 'POST',
      data: { participantIds, nameChat },
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
