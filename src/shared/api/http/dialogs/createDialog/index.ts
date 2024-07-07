import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIDialog, IDialog, IConfigAsyncThunk } from '@shared/models';
import { API } from '@shared/api';

import { ValidationSchema } from './createDialog.validation';
import { createDialogConvertation } from './createDialog.convertation';
import { ICreateDialog } from './createDialog.type';

export const createDialog = createAsyncThunk<IDialog, ICreateDialog, IConfigAsyncThunk>(
  'Dialogs/createDialog',
  ({ participantIds, nameChat }, { rejectWithValue }) => {
    return API<APIDialog>({
      url: `api/dialogs`,
      method: 'POST',
      data: { participantIds, nameChat },
    })
      .then(({ data }) => {
        const isValid = ValidationSchema.isValidSync(data);

        if (!isValid) {
          console.warn(ValidationSchema.validateSync(data));
        }

        return createDialogConvertation(data);
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);
